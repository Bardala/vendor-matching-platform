import { ProjectReqDto } from '../dto/project-req.dto';
import { Project } from '../entities/project.entity';

export interface IProjectsService {
  findAll(): Promise<Project[]>;
  findAllByClient(clientId: number): Promise<Project[]>;
  findOne(id: number): Promise<Project>;
  create(userId: number, data: ProjectReqDto): Promise<Project>;
  update(id: number, data: ProjectReqDto): Promise<Project>;
  delete(id: number): Promise<void>;
  attachServices(projectId: number, serviceIds: number[]): Promise<void>;
}
