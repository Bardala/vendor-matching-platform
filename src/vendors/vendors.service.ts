import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IVendorsService } from './interfaces/i-vendors-service.interface';
import { Vendor } from './entities/vendor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from 'src/services/entities/service.entity';
import { VendorReqDto } from './dto/vendor-req.dto';
import { ResultSetHeader } from 'mysql2';

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

  async create(data: VendorReqDto): Promise<Vendor> {
    const existingVendor = await this.vendorRepo.findOne({
      where: { name: data.name },
    });
    if (existingVendor)
      throw new ConflictException('Vendor name already exists');

    const servicesOffered = data.servicesOffered.map(id => ({ id }));

    return await this.vendorRepo.save({ ...data, servicesOffered });
  }

  async update(id: number, data: VendorReqDto): Promise<Vendor> {
    const existingVendor = await this.findOne(id);
    const isNameExisted = await this.vendorRepo.findOne({
      where: { name: data.name },
    });
    if (isNameExisted && data.name !== existingVendor.name)
      throw new ConflictException('This name already exists, change it');

    const servicesOffered = data.servicesOffered.map(id => ({ id }));
    const updatedVendor = { ...existingVendor, ...data, servicesOffered };

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

  async flagExpiredSlaVendors(thresholdHours = 72): Promise<number> {
    const result: ResultSetHeader = await this.vendorRepo.query(
      `
    UPDATE vendors
    SET is_active = false, updated_at = NOW()
    WHERE response_sla_hours > ? 
      AND is_active = true
    `,
      [thresholdHours],
    );

    return result.affectedRows;
  }
}
