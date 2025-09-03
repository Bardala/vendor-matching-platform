import { Injectable } from '@nestjs/common';
import { IResearchService } from './interfaces/i-research-service.interface';
import { ResearchDocument } from './schema/research-document.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UploadResearchDto } from './dto/research-document.dto';

@Injectable()
export class ResearchService implements IResearchService {
  constructor(
    @InjectModel(ResearchDocument.name)
    private researchModel: Model<ResearchDocument>,
  ) {}

  async findAll(): Promise<ResearchDocument[]> {
    return await this.researchModel.find();
  }

  async upload(uploadDto: UploadResearchDto): Promise<ResearchDocument> {
    const doc = new this.researchModel(uploadDto);
    return doc.save();
  }

  async findByProject(projectId: number): Promise<ResearchDocument[]> {
    return this.researchModel.find({ projectId }).exec();
  }

  // We can add pagination later.
  async search(query: {
    text?: string;
    tags?: string[];
    projectId?: number;
  }): Promise<ResearchDocument[]> {
    const filter: FilterQuery<ResearchDocument> = {};
    if (query.projectId) filter.projectId = query.projectId;
    if (query.tags) filter.tags = { $in: query.tags };
    if (query.text) filter.$text = { $search: query.text };
    if (Object.keys(filter).length === 0)
      return this.researchModel.find().sort({ createdAt: -1 }).limit(10).exec();

    return this.researchModel.find(filter).exec();
  }
}
