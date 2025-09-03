import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IMatchesService } from './interfaces/i-matches-service.interface';
import { Match } from './entities/match.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Project, ProjectStatus } from 'src/projects/entities/project.entity';
import { Vendor } from 'src/vendors/entities/vendor.entity';
import { Repository } from 'typeorm';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class MatchesService implements IMatchesService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(Match)
    private readonly matchRepo: Repository<Match>,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(Vendor)
    private readonly vendorRepo: Repository<Vendor>,
    private readonly notificationsService: NotificationsService,
  ) {}

  async rebuildMatchesForProject(projectId: number): Promise<Match[]> {
    const project = await this.projectRepo.findOne({
      where: { id: projectId },
      relations: ['servicesNeeded'],
    });
    if (!project) throw new NotFoundException('Project not found');

    await this.matchRepo.delete({ project: { id: projectId } });

    await this.matchRepo.query(
      `
    INSERT INTO matches (project_id, vendor_id, score, created_at, updated_at)
    SELECT 
        p.id as project_id,
        v.id as vendor_id,
        (
          COUNT(ps.service_id) * 2 + v.rating +
          CASE
            WHEN v.response_sla_hours <= 6 THEN 7
            WHEN v.response_sla_hours <= 12 THEN 6
            WHEN v.response_sla_hours <= 24 THEN 5
            WHEN v.response_sla_hours <= 48 THEN 3
            ELSE 1
          END
        ) as score,
        NOW() as created_at,
        NOW() as updated_at
    FROM projects p
    CROSS JOIN vendors v
    INNER JOIN project_services ps ON p.id = ps.project_id
    INNER JOIN vendor_services vs ON v.id = vs.vendor_id AND ps.service_id = vs.service_id
    WHERE JSON_CONTAINS(v.countries_supported, p.country)
      AND p.id = ?
    GROUP BY p.id, v.id, v.rating, v.response_sla_hours
    HAVING COUNT(ps.service_id) > 0
    ON DUPLICATE KEY UPDATE
        score = VALUES(score),
        updated_at = NOW()
    `,
      [projectId],
    );

    // Get newly created matches
    const newMatches = await this.findAllByProject(projectId);

    // Notify client about new matches (only for high-quality matches)
    const highQualityMatches = newMatches.filter(match => match.score >= 7);
    for (const match of highQualityMatches) {
      try {
        await this.notificationsService.notifyMatch(match.id);
      } catch (error) {
        this.logger.error(`Failed to notify match ${match.id}:`, error);
        // Continue with other matches even if one fails
      }
    }

    return newMatches;
  }

  async refreshDailyMatches(): Promise<void> {
    const activeProjects = await this.projectRepo.find({
      where: { status: ProjectStatus.ACTIVE },
      select: ['id'],
    });

    for (const project of activeProjects) {
      await this.rebuildMatchesForProject(project.id);
    }
  }

  async findAllByProject(projectId: number): Promise<Match[]> {
    return this.matchRepo.find({
      where: { project: { id: projectId } },
      relations: ['vendor'],
    });
  }

  async markAsNotified(matchId: number): Promise<void> {
    await this.matchRepo.update(matchId, { isNotified: true });
  }
}
