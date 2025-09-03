import {
  IsEnum,
  IsOptional,
  IsArray,
  IsJSON,
  IsDecimal,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectStatus } from '../entities/project.entity';

export class ProjectReqDto {
  @ApiProperty({
    description: 'Country information as string (e.g., EGY)',
    example: 'EGY',
  })
  @IsJSON()
  country: string;

  @ApiProperty({
    description: 'Total budget allocated for the project',
    example: 15000.75,
  })
  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  budget: number;

  @ApiProperty({
    description: 'Current status of the project',
    enum: ProjectStatus,
    default: ProjectStatus.PENDING,
  })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;

  @ApiProperty({
    description: 'List of service IDs required for the project',
    example: [1, 2, 5],
    type: [Number],
  })
  @IsArray()
  @Type(() => Number)
  servicesNeeded: number[];
}
