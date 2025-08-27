import { Injectable, NotFoundException } from '@nestjs/common';
import { IVendorsService } from './interfaces/i-vendors-service.interface';
import { Vendor } from './entities/vendor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from 'src/services/entities/service.entity';

@Injectable()
export class VendorsService implements IVendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepo: Repository<Vendor>,

    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
  ) {}

  findAll(): Promise<Vendor[]> {
    return this.vendorRepo.find();
  }

  async findOne(id: number): Promise<Vendor> {
    const existingVendor = await this.vendorRepo.findOne({ where: { id } });
    if (!existingVendor)
      throw new NotFoundException(`Vendor not found with id: ${id}`);

    return existingVendor;
  }

  async create(data: Partial<Vendor>): Promise<Vendor> {
    return await this.vendorRepo.save(data);
  }

  async update(id: number, data: Partial<Vendor>): Promise<Vendor> {
    const existingVendor = await this.findOne(id);

    const updatedVendor = { ...existingVendor, ...data };

    return await this.vendorRepo.save(updatedVendor);
  }

  async delete(id: number): Promise<void> {
    const existingVendor = await this.findOne(id);
    await this.vendorRepo.remove(existingVendor);
  }

  async attachServices(vendorId: number, serviceIds: number[]): Promise<void> {
    const existingVendor = await this.vendorRepo.findOne({
      where: { id: vendorId },
      relations: ['servicesOffered'],
    });
    if (!existingVendor)
      throw new NotFoundException(`Vendor not found with id ${vendorId}`);

    const services = await this.serviceRepo.findByIds(serviceIds);
    if (serviceIds.length !== services.length)
      throw new NotFoundException('Some services not found');

    existingVendor.servicesOffered = [
      ...existingVendor.servicesOffered,
      ...services,
    ];

    await this.vendorRepo.save(existingVendor);
  }
}
