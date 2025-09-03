import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ResearchService } from './research.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { UploadResearchDto } from './dto/research-document.dto';

@ApiTags('research')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('research')
export class ResearchController {
  constructor(private readonly researchService: ResearchService) {}

  @Get()
  // @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get all researches',
  })
  async findAll() {
    return await this.researchService.findAll();
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Upload a new research entry, Only accessible by admins.',
  })
  @ApiBody({
    type: UploadResearchDto,
    description: 'Research payload with projectId, title, content, and tags',
  })
  async upload(@Body() req: UploadResearchDto) {
    return await this.researchService.upload(req);
  }

  @Get('project/:projectId')
  @ApiOperation({ summary: 'Get research entries by project ID' })
  @ApiParam({
    name: 'projectId',
    type: Number,
    description: 'Project identifier',
  })
  async findByProject(@Param('projectId') projectId: number) {
    return await this.researchService.findByProject(projectId);
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search research entries by text, tags, or projectId',
  })
  @ApiQuery({ name: 'text', required: false, type: String })
  @ApiQuery({ name: 'tags', required: false, type: [String] })
  @ApiQuery({ name: 'projectId', required: false, type: Number })
  async search(
    @Query('text') text?: string,
    @Query('tags') tags?: string[],
    @Query('projectId') projectId?: number,
  ) {
    return await this.researchService.search({ text, tags, projectId });
  }
}
