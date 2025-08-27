import { Module } from '@nestjs/common';
import { ResearchService } from './research.service';
import { AnalyticsModule } from 'src/analytics/analytics.module';
import { MatchesModule } from 'src/matches/matches.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ResearchDocument,
  ResearchDocumentSchema,
} from './schema/research-document.schema';

@Module({
  imports: [
    AnalyticsModule,
    MatchesModule,
    MongooseModule.forFeature([
      { name: ResearchDocument.name, schema: ResearchDocumentSchema },
    ]),
  ],
  providers: [ResearchService],
})
export class ResearchModule {}
