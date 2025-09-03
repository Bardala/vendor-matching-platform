import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { VendorsModule } from 'src/vendors/vendors.module';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { MatchesScheduler } from './matches.scheduler';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match]),
    forwardRef(() => ProjectsModule),
    forwardRef(() => VendorsModule),
    NotificationsModule,
  ],
  exports: [TypeOrmModule],
  providers: [MatchesService, MatchesScheduler],
  controllers: [MatchesController],
})
export class MatchesModule {}
