import { Injectable, Logger } from '@nestjs/common';
import { INotificationsService } from './interfaces/i-notifications-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../matches/entities/match.entity';
import { Project } from '../projects/entities/project.entity';
import { Vendor } from 'src/vendors/entities/vendor.entity';

@Injectable()
export class NotificationsService implements INotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(Match)
    private readonly matchRepo: Repository<Match>,
  ) {}

  sendEmail(to: string, subject: string, body: string): void {
    // Mock email Service
    this.logger.log(`📧 Email notification sent to: ${to}`);
    this.logger.debug(`Subject: ${subject}`);
    this.logger.debug(`Body: ${body}`);
  }

  async notifyMatch(matchId: number): Promise<void> {
    try {
      const match = await this.matchRepo.findOne({
        where: { id: matchId },
        relations: ['vendor', 'project', 'project.client'],
      });

      if (!match) {
        this.logger.warn(`Match ${matchId} not found for notification`);
        return;
      }

      const { project, vendor } = match;

      // Send email to client's contact email
      this.sendEmail(
        project.client.contactEmail,
        `New Vendor Match for Your Project #${project.id}`,
        this.buildMatchNotificationEmail(project, vendor, match),
      );

      await this.matchRepo.update(matchId, { isNotified: true });

      this.logger.log(
        `✅ Notified client ${project.client.contactEmail} about match ${matchId}`,
      );
    } catch (error) {
      this.logger.error(`Failed to notify match ${matchId}:`, error.stack);
      throw error;
    }
  }

  private buildMatchNotificationEmail(
    project: Project,
    vendor: Vendor,
    match: Match,
  ): string {
    return `
      Dear ${project.client.companyName},

      We're excited to inform you that a new vendor match has been found for your expansion project!

      📋 Project Details:
      - Project ID: #${project.id}
      - Target Country: ${project.country}
      - Budget: $${project.budget}

      👥 Vendor Match:
      - Vendor: ${vendor.name}
      - Match Score: ${match.score}
      - Vendor Rating: ${vendor.rating}/5
      - Response SLA: ${vendor.responseSlaHours} hours

      This vendor has been selected based on:
      ✅ Country coverage in ${project.country}
      ✅ Service overlap with your requirements
      ✅ Strong performance history

      Next Steps:
      1. Review the vendor profile in your dashboard
      2. Contact the vendor to discuss your project
      3. Monitor response times within the SLA period

      You can view all matches for this project in your Expanders360 dashboard.

      Best regards,
      The Expanders360 Team

      ---
      This is an automated notification. Please do not reply to this email.
    `.trim();
  }
}
