import { VendorReqDto } from '../dto/vendor-req.dto';
import { Vendor } from '../entities/vendor.entity';

export interface IVendorsService {
  findAll(): Promise<Vendor[]>;
  findOne(id: number): Promise<Vendor>;
  create(data: VendorReqDto): Promise<Vendor>;
  update(id: number, data: VendorReqDto): Promise<Vendor>;
  delete(id: number): Promise<void>;
  attachServices(vendorId: number, serviceIds: number[]): Promise<void>;
  flagExpiredSlaVendors(thresholdHours: number): Promise<number>;
}
