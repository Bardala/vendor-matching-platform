import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResearchDocument } from '../schema/research-document.schema';

@Injectable()
export class ResearchSeeder {
  constructor(
    @InjectModel(ResearchDocument.name)
    private readonly researchModel: Model<ResearchDocument>,
  ) {}

  async seed() {
    const existing = await this.researchModel.countDocuments();
    if (existing > 0) {
      console.log('🔎 Research data already exists. Skipping seed.');
      return;
    }

    const seedData: Partial<ResearchDocument>[] = [
      {
        projectId: 1,
        title: 'Market Expansion Strategy',
        content: 'Detailed analysis of UAE market entry.',
        tags: ['UAE', 'strategy', 'expansion'],
      },
      {
        projectId: 2,
        title: 'Legal Compliance Overview',
        content: 'KSA regulations for food industry.',
        tags: ['KSA', 'legal', 'food'],
      },
      {
        projectId: 3,
        title: 'Recruitment Trends in Egypt',
        content: 'Hiring patterns and agency performance.',
        tags: ['EGY', 'recruitment', 'trends'],
      },
    ];

    await this.researchModel.insertMany(seedData);
    console.log('✅ Research seed data inserted.');
  }
}
