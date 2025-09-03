import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { MatchesModule } from 'src/matches/matches.module';
import { AnalyticsController } from './analytics.controller';
import { ProjectsModule } from 'src/projects/projects.module';
import { ResearchModule } from 'src/research/research.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ResearchDocument,
  ResearchDocumentSchema,
} from 'src/research/schema/research-document.schema';

@Module({
  imports: [
    MatchesModule,
    ProjectsModule,
    ResearchModule,
    MongooseModule.forFeature([
      { name: ResearchDocument.name, schema: ResearchDocumentSchema },
    ]),
  ],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
