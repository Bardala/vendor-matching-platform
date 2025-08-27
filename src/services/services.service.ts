import { Injectable, NotFoundException } from '@nestjs/common';
import { IServicesService } from './interfaces/i-services-service.interface';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService implements IServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
  ) {}

  async findOneById(id: number): Promise<Service> {
    const exitingService = await this.serviceRepo.findOne({ where: { id } });
    if (!exitingService)
      throw new NotFoundException(`Service not found with id: ${id}`);
    return exitingService;
  }

  async create(serviceData: Partial<Service>): Promise<Service> {
    return await this.serviceRepo.save(serviceData);
  }

  async update(id: number, updateData: Partial<Service>): Promise<Service> {
    const existingService = await this.findOneById(id);
    if (!existingService)
      throw new NotFoundException(`Service not found with id: ${id}`);
    const updatedService = { ...existingService, ...updateData };
    return await this.serviceRepo.save(updatedService);
  }

  async delete(id: number): Promise<void> {
    const existingService = await this.findOneById(id);
    await this.serviceRepo.remove(existingService);
  }
}
