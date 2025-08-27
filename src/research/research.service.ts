import { Injectable } from '@nestjs/common';
import { IResearchService } from './interfaces/i-research-service.interface';
import { ResearchDocument } from './schema/research-document.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ResearchService implements IResearchService {
  constructor(
    @InjectModel(ResearchDocument.name)
    private researchModel: Model<ResearchDocument>,
  ) {}

  async upload(
    projectId: number,
    title: string,
    content: string,
    tags: string[],
  ): Promise<ResearchDocument> {
    const doc = new this.researchModel({ projectId, title, content, tags });
    return doc.save();
  }

  async findByProject(projectId: number): Promise<ResearchDocument[]> {
    return this.researchModel.find({ projectId }).exec();
  }

  async search(query: {
    text?: string;
    tags?: string[];
    projectId?: number;
  }): Promise<ResearchDocument[]> {
    const filter: FilterQuery<ResearchDocument> = {};
    if (query.projectId) filter.projectId = query.projectId;
    if (query.tags) filter.tags = { $in: query.tags };
    /* $text is used with a text index in MongoDB
     to perform text search within fields that have an index
     (usually title or content). */
    if (query.text) filter.$text = { $search: query.text };

    return this.researchModel.find(filter).exec();
  }
}
