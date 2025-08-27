import { Injectable } from '@nestjs/common';
import { IAnalyticsService } from './interfaces/i-analytics-service.interface';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Match } from 'src/matches/entities/match.entity';
import { ResearchDocument } from 'src/research/schema/research-document.schema';
import { Repository } from 'typeorm';
import { TopVendor } from 'src/common/types/top-vendor.type';
import { VendorTrend } from 'src/common/types/vendor-trend.type';

@Injectable()
export class AnalyticsService implements IAnalyticsService {
  constructor(
    @InjectRepository(Match)
    private matchRepo: Repository<Match>,
    @InjectModel(ResearchDocument.name)
    private researchModel: Model<ResearchDocument>,
  ) {}

  async getTopVendors(country: string, limit = 3): Promise<TopVendor[]> {
    return this.matchRepo.query(
      `
    SELECT v.id, v.name, AVG(m.score) as avg_score
    FROM matches m
    JOIN vendors v ON v.id = m.vendor_id
    JOIN projects p ON p.id = m.project_id
    WHERE JSON_CONTAINS(p.country, ?) 
      AND m.created_at >= NOW() - INTERVAL 30 DAY
    GROUP BY v.id, v.name
    ORDER BY avg_score DESC
    LIMIT ?;
    `,
      [JSON.stringify(country), limit],
    );
  }

  async getResearchCountsByCountry(): Promise<
    { country: string; documentCount: number }[]
  > {
    return this.researchModel.aggregate([
      { $group: { _id: '$country', documentCount: { $sum: 1 } } },
      { $project: { country: '$_id', documentCount: 1, _id: 0 } },
    ]);
  }

  async getVendorPerformanceTrends(): Promise<VendorTrend[]> {
    return this.matchRepo.query(`
      SELECT v.id, v.name, DATE(m.created_at) as day, AVG(m.score) as avg_score
      FROM matches m
      JOIN vendors v ON v.id = m.vendor_id
      GROUP BY v.id, v.name, day
      ORDER BY day DESC
    `);
  }
}
