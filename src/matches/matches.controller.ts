import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { MatchesService } from './matches.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Match } from './entities/match.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('matches')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post('rebuild')
  @ApiOperation({
    summary: 'Rebuild matches for a project',
    description: `Generates or updates vendor matches for the given project based on service compatibility, SLA, and rating. This operation is idempotent and recalculates scores.`,
  })
  @ApiParam({
    name: 'projectId',
    type: Number,
    description: 'ID of the project to rebuild matches for',
  })
  @ApiResponse({
    status: 201,
    description: 'Matches successfully rebuilt and returned',
    type: [Match],
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  rebuild(@Param('projectId') projectId: number) {
    return this.matchesService.rebuildMatchesForProject(projectId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get matches for a project',
    description:
      'Returns all vendor matches associated with the specified project.',
  })
  @ApiParam({
    name: 'projectId',
    type: Number,
    description: 'ID of the project to fetch matches for',
  })
  @ApiResponse({
    status: 200,
    description: 'List of matches for the project',
    type: [Match],
  })
  findAll(@Param('projectId') projectId: number) {
    return this.matchesService.findAllByProject(projectId);
  }
}
