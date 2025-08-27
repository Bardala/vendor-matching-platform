import { Service } from '../entities/service.entity';

export interface IServicesService {
  findOneById(id: number): Promise<Service>;
  create(serviceData: Partial<Service>): Promise<Service>;
  update(id: number, updateData: Partial<Service>): Promise<Service>;
  delete(id: number): Promise<void>;
}
