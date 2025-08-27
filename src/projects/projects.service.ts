import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { IProjectsService } from './interfaces/i-projects-service.interface';
import { Client } from 'src/clients/entities/client.entity';
import { Service } from 'src/services/entities/service.entity';

@Injectable()
export class ProjectsService implements IProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,

    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
  ) {}

  findAllByClient(clientId: number): Promise<Project[]> {
    return this.projectRepo.find({ where: { clientId } });
  }

  async findOne(id: number): Promise<Project> {
    const exitingProject = await this.projectRepo.findOne({ where: { id } });
    if (!exitingProject)
      throw new NotFoundException(`Project not found with id ${id}`);

    return exitingProject;
  }

  async create(clientId: number, data: Partial<Project>): Promise<Project> {
    const existingClient = await this.clientRepo.findOne({
      where: { id: clientId },
    });
    if (!existingClient)
      throw new NotFoundException(`Client not found with id ${clientId}`);

    const project = await this.projectRepo.save({ clientId, ...data });
    return project;
  }

  async update(id: number, data: Partial<Project>): Promise<Project> {
    const exitingProject = await this.findOne(id);
    const updatedProject = { ...exitingProject, ...data };
    return this.projectRepo.save(updatedProject);
  }

  async delete(id: number): Promise<void> {
    const exitingProject = await this.findOne(id);
    await this.projectRepo.remove(exitingProject);
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
