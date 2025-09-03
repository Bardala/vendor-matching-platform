import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class VendorReqDto {
  @ApiProperty({ example: 'Acme Logistics', description: 'Vendor name' })
  @IsString()
  name: string;

  @ApiProperty({
    example: ['Egypt', 'Morocco'],
    description: 'List of supported countries',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  countriesSupported: string[];

  @ApiProperty({
    example: 4.5,
    description: 'Vendor rating (0.00 to 5.00)',
    minimum: 0,
    maximum: 5,
  })
  @IsDecimal({ decimal_digits: '0,2' })
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty({
    example: 24,
    description: 'Response SLA in hours',
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  responseSlaHours: number;

  @ApiProperty({
    example: true,
    description: 'Whether the vendor is active',
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    example: [1, 3],
    description: `IDs of services offered by the vendor. Available options:
      1 - marketing
      2 - legal
      3 - logistics
      4 - recruitment
      5 - translation`,
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  servicesOffered: number[];
}
