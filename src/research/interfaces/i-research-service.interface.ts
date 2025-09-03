import { UploadResearchDto } from '../dto/research-document.dto';
import { ResearchDocument } from '../schema/research-document.schema';

export interface IResearchService {
  findAll(): Promise<ResearchDocument[]>;
  upload(uploadDto: UploadResearchDto): Promise<ResearchDocument>;
  findByProject(projectId: number): Promise<ResearchDocument[]>;
  search(query: {
    text?: string;
    tags?: string[];
    projectId?: number;
  }): Promise<ResearchDocument[]>;
}
