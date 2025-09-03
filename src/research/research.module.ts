import { Module } from '@nestjs/common';
import { ResearchService } from './research.service';
import { MatchesModule } from 'src/matches/matches.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ResearchDocument,
  ResearchDocumentSchema,
} from './schema/research-document.schema';
import { ResearchController } from './research.controller';
import { ResearchSeeder } from './seeds/research.seeder';

@Module({
  imports: [
    MatchesModule,
    MongooseModule.forFeature([
      { name: ResearchDocument.name, schema: ResearchDocumentSchema },
    ]),
  ],
  exports: [MongooseModule],
  providers: [ResearchService, ResearchSeeder],
  controllers: [ResearchController],
})
export class ResearchModule {}
