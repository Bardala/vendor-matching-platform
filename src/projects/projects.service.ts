import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { IProjectsService } from './interfaces/i-projects-service.interface';
import { Client } from 'src/clients/entities/client.entity';
import { Service } from 'src/services/entities/service.entity';
import { ProjectReqDto } from './dto/project-req.dto';
import { ResearchDocument } from 'src/research/schema/research-document.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService implements IProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,

    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,

    @InjectModel(ResearchDocument.name)
    private researchModel: Model<ResearchDocument>,
  ) {}

  async findAll(): Promise<Project[]> {
    return await this.projectRepo.find();
  }

  findAllByClient(clientId: number): Promise<Project[]> {
    return this.projectRepo.find({ where: { clientId } });
  }

  async findOne(id: number): Promise<Project> {
    const exitingProject = await this.projectRepo.findOne({ where: { id } });
    if (!exitingProject)
      throw new NotFoundException(`Project not found with id ${id}`);

    return exitingProject;
  }

  async create(clientId: number, data: ProjectReqDto): Promise<Project> {
    const existingClient = await this.clientRepo.findOne({
      where: { id: clientId },
    });
    if (!existingClient)
      throw new NotFoundException(`Client not found with id ${clientId}`);

    const servicesNeeded = data.servicesNeeded.map(id => ({ id }));

    const project = await this.projectRepo.save({
      ...data,
      servicesNeeded,
      clientId,
    });
    return project;
  }

  async update(id: number, data: ProjectReqDto): Promise<Project> {
    const exitingProject = await this.findOne(id);

    let servicesNeeded: { id: number }[] = exitingProject.servicesNeeded?.map(
      s => ({ id: s.id }),
    );
    if (Array.isArray(data.servicesNeeded))
      servicesNeeded = data.servicesNeeded?.map(id => ({ id }));

    const updatedProject = { ...exitingProject, ...data, servicesNeeded };
    return this.projectRepo.save(updatedProject);
  }

  async delete(id: number): Promise<void> {
    const existingProject = await this.findOne(id);
    if (!existingProject)
      throw new NotFoundException(`Project not found with id: ${id}`);

    await this.researchModel.deleteMany({ projectId: id });

    await this.projectRepo.remove(existingProject);
  }

  async attachServices(projectId: number, serviceIds: number[]): Promise<void> {
    const exitingProject = await this.projectRepo.findOne({
      where: { id: projectId },
      relations: ['servicesNeeded'],
    });
    if (!exitingProject)
      throw new NotFoundException(`Project not found with id: ${projectId}`);

    const services = await this.serviceRepo.findByIds(serviceIds);
    if (services.length !== serviceIds.length)
      throw new NotFoundException('Some services not found');

    exitingProject.servicesNeeded = [
      ...exitingProject.servicesNeeded,
      ...services,
    ];

    await this.projectRepo.save(exitingProject);
  }
}
