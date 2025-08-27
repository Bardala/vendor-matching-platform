import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { MatchesModule } from 'src/matches/matches.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/matches/entities/match.entity';
import {
  ResearchDocument,
  ResearchDocumentSchema,
} from 'src/research/schema/research-document.schema';

@Module({
  imports: [
    MatchesModule,
    TypeOrmModule.forFeature([Match]),
    MongooseModule.forFeature([
      { name: ResearchDocument.name, schema: ResearchDocumentSchema },
    ]),
  ],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
