import { ResearchDocument } from '../schema/research-document.schema';

export interface IResearchService {
  upload(
    projectId: number,
    title: string,
    content: string,
    tags: string[],
  ): Promise<ResearchDocument>;
  findByProject(projectId: number): Promise<ResearchDocument[]>;
  search(query: {
    text?: string;
    tags?: string[];
    projectId?: number;
  }): Promise<ResearchDocument[]>;
}
