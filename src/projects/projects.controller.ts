import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Request,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectReqDto } from './dto/project-req.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User, UserRole } from 'src/users/entities/user.entity';
import type { Request as Req } from 'express';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('projects')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get all projects. Only accessible by Admin',
  })
  async getAll() {
    return await this.projectsService.findAll();
  }

  @Post()
  @Roles(UserRole.CLIENT)
  @ApiOperation({
    summary: 'Create a new project. Only accessible by Client',
    description: '',
  })
  async create(@Request() req: Req, @Body() dto: ProjectReqDto) {
    const authUser = req.user as User;
    return await this.projectsService.create(authUser.clientId, dto);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Get a project by ID' })
  async findOne(@Param('id') id: number) {
    return await this.projectsService.findOne(id);
  }

  @Get('all/:id')
  @Roles(UserRole.CLIENT)
  @ApiOperation({
    summary: 'Get all projects for a client. Only accessible by Client',
  })
  @ApiParam({ name: 'id', type: Number })
  async findAllByClient(@Param('id') id: number) {
    return await this.projectsService.findAllByClient(id);
  }

  @Put(':id')
  @Roles(UserRole.CLIENT)
  @ApiOperation({
    summary: 'Update a project by ID. Only accessible by Client',
  })
  @ApiParam({ name: 'id', type: Number })
  async update(@Param('id') id: number, @Body() dto: ProjectReqDto) {
    return await this.projectsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project by ID' })
  @ApiParam({ name: 'id', type: Number })
  async delete(@Param('id') id: number) {
    return await this.projectsService.delete(id);
  }
}
