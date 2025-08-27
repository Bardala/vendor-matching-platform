import { Client } from '../entities/client.entity';

export interface IClientsService {
  findAll(): Promise<Client[]>;
  findOne(id: number): Promise<Client>;
  create(data: Partial<Client>): Promise<Client>;
  update(id: number, data: Partial<Client>): Promise<Client>;
  delete(id: number): Promise<void>;
}
