import { Vendor } from '../entities/vendor.entity';

export interface IVendorsService {
  findAll(): Promise<Vendor[]>;
  findOne(id: number): Promise<Vendor>;
  create(data: Partial<Vendor>): Promise<Vendor>;
  update(id: number, data: Partial<Vendor>): Promise<Vendor>;
  delete(id: number): Promise<void>;
  attachServices(vendorId: number, serviceIds: number[]): Promise<void>;
}
