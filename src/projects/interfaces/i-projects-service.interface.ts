import { Project } from '../entities/project.entity';

export interface IProjectsService {
  findAllByClient(clientId: number): Promise<Project[]>;
  findOne(id: number): Promise<Project>;
  create(clientId: number, data: Partial<Project>): Promise<Project>;
  update(id: number, data: Partial<Project>): Promise<Project>;
  delete(id: number): Promise<void>;
  attachServices(projectId: number, serviceIds: number[]): Promise<void>;
}
