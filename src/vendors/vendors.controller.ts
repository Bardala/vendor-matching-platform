import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorReqDto } from './dto/vendor-req.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('vendors')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Create a new vendor. Only accessible by admins.',
    description:
      'Registers a vendor with supported countries, services, SLA, and rating',
  })
  @ApiBody({ type: VendorReqDto })
  @ApiResponse({ status: 201, description: 'Vendor successfully created' })
  @ApiResponse({ status: 400, description: 'Validation error or bad input' })
  async create(@Body() dto: VendorReqDto) {
    return await this.vendorsService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'List all vendors',
    description: 'Returns a list of all registered vendors.',
  })
  @ApiResponse({ status: 200, description: 'List of vendors returned' })
  async findAll() {
    return await this.vendorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get vendor by ID',
  })
  @ApiParam({ name: 'id', type: Number, description: 'Vendor ID' })
  @ApiResponse({ status: 200, description: 'Vendor found' })
  @ApiResponse({ status: 404, description: 'Vendor not found' })
  async findOne(@Param('id') id: number) {
    return await this.vendorsService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Update vendor details. Only accessible by admins.',
    description:
      'Updates vendor information including services, SLA, and status',
  })
  @ApiParam({ name: 'id', type: Number, description: 'Vendor ID' })
  @ApiBody({ type: VendorReqDto })
  @ApiResponse({ status: 200, description: 'Vendor updated successfully' })
  @ApiResponse({ status: 404, description: 'Vendor not found' })
  async update(@Param('id') id: number, @Body() dto: VendorReqDto) {
    return await this.vendorsService.update(id, dto);
  }
}
