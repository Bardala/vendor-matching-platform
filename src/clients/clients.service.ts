import { Injectable, NotFoundException } from '@nestjs/common';
import { IClientsService } from './interfaces/i-clients-service.interface';
import { Client } from './entities/client.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientsService implements IClientsService {
  constructor(
    @InjectRepository(Client) private readonly clientRepo: Repository<Client>,
  ) {}

  /** should be accessed only by admin for now */
  findAll(): Promise<Client[]> {
    return this.clientRepo.find();
  }

  async create(
    data: Pick<Client, 'companyName' | 'contactEmail'>,
    manager?: EntityManager,
  ): Promise<Client> {
    const repo = manager ? manager.getRepository(Client) : this.clientRepo;

    const existingClient = await repo.findOne({
      where: { contactEmail: data.contactEmail },
    });

    if (existingClient) return existingClient;

    const client = repo.create(data);
    return await repo.save(client);
  }

  async update(id: number, data: Partial<Client>): Promise<Client> {
    const existingClient = await this.findOne(id);

    if (data.companyName) existingClient.companyName = data.companyName;

    return await this.clientRepo.save(existingClient);
  }

  /** should be accessed only by admin for now */
  async delete(id: number): Promise<void> {
    const existingClient = await this.findOne(id);
    await this.clientRepo.remove(existingClient);
  }

  /** should be accessed only by admin for now */
  async findOne(id: number): Promise<Client> {
    const existingClient = await this.clientRepo.findOne({ where: { id } });
    if (!existingClient)
      throw new NotFoundException('Client with id not found');
    return existingClient;
  }
}
