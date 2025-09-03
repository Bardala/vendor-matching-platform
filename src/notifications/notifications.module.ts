import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Match } from 'src/matches/entities/match.entity';
import { Project } from 'src/projects/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Project, Client])],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
