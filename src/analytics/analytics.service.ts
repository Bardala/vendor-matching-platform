import { Injectable } from '@nestjs/common';
import { IAnalyticsService } from './interfaces/i-analytics-service.interface';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Match } from 'src/matches/entities/match.entity';
import { ResearchDocument } from 'src/research/schema/research-document.schema';
import { In, Repository } from 'typeorm';
import { TopVendor } from 'src/common/types/top-vendor.type';
import { VendorTrend } from 'src/common/types/vendor-trend.type';
import { ResearchCount } from 'src/common/types/research-count.type';
import { CountryAnalytics } from 'src/common/types/country-analytics.type';
import { CountryQueryResult } from 'src/common/types/country-query-result.type';
import { ProjectCountry } from 'src/common/types/projects-country.type';
import { VendorScoreResult } from 'src/common/types/vendor-score-result.type';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class AnalyticsService implements IAnalyticsService {
  constructor(
    @InjectRepository(Match)
    private matchRepo: Repository<Match>,
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
    @InjectModel(ResearchDocument.name)
    private researchModel: Model<ResearchDocument>,
  ) {}

  async getResearchCountsByCountry(): Promise<ResearchCountByCountry[]> {
    const docs: ResearchCountByProject[] = await this.researchModel.aggregate([
      { $group: { _id: '$projectId', documentCount: { $sum: 1 } } },
    ]);

    const projectIds: number[] = docs.map(d => d._id);

    const projects: Pick<Project, 'id' | 'country'>[] =
      await this.projectRepo.find({
        where: { id: In(projectIds) },
        select: ['id', 'country'],
      });

    const countryMap = new Map<number, string>(
      projects.map(p => [p.id, p.country]),
    );

    return docs.map<ResearchCountByCountry>(d => ({
      country: countryMap.get(d._id) || 'Unknown',
      documentCount: d.documentCount,
    }));
  }

  async getVendorPerformanceTrends(): Promise<VendorTrend[]> {
    return this.matchRepo.query(`
      SELECT v.id, v.name, DATE(m.created_at) as day, AVG(m.score) as avg_score
      FROM matches m
      JOIN vendors v ON v.id = m.vendor_id
      GROUP BY v.id, v.name, day
      ORDER BY avg_score DESC
    `);
  }

  async getTopVendors(): Promise<CountryAnalytics[]> {
    // Step 1: Get distinct countries from projects
    const countriesQuery: CountryQueryResult[] = await this.projectRepo.query(`
    SELECT DISTINCT JSON_UNQUOTE(country) as country
    FROM projects
    WHERE country IS NOT NULL
  `);
    const countries: string[] = countriesQuery.map(
      (row: CountryQueryResult) => row.country,
    );

    // Step 2: Get top 3 vendors per country using window function
    const topVendorsPerCountryQuery: VendorScoreResult[] = await this.matchRepo
      .query(`
      WITH ranked_vendors AS (
        SELECT 
          JSON_UNQUOTE(p.country) as country,
          v.id as vendor_id,
          v.name as vendor_name,
          AVG(m.score) as avg_score,
          ROW_NUMBER() OVER (PARTITION BY JSON_UNQUOTE(p.country) ORDER BY AVG(m.score) DESC) as row_num
        FROM matches m
        JOIN vendors v ON v.id = m.vendor_id
        JOIN projects p ON p.id = m.project_id
        WHERE m.created_at >= NOW() - INTERVAL 30 DAY
        GROUP BY JSON_UNQUOTE(p.country), v.id, v.name
      )
      SELECT 
        country,
        vendor_id,
        vendor_name,
        avg_score
      FROM ranked_vendors
      WHERE row_num <= 3
    `);

    // Group top vendors by country
    const topVendorsByCountry: { [country: string]: TopVendor[] } = {};
    for (const row of topVendorsPerCountryQuery) {
      const country = row.country;
      if (!topVendorsByCountry[country]) {
        topVendorsByCountry[country] = [];
      }
      topVendorsByCountry[country].push({
        id: Number(row.vendor_id),
        name: row.vendor_name,
        avg_score:
          typeof row.avg_score === 'string'
            ? parseFloat(row.avg_score)
            : row.avg_score,
      });
    }

    // Step 3: Get research document count per country
    // Fetch all projects with id and country
    const projects: ProjectCountry[] = await this.projectRepo.find({
      select: ['id', 'country'],
    });

    // Aggregate research document counts by projectId from MongoDB
    const researchCountsByProjectId: ResearchCount[] =
      await this.researchModel.aggregate([
        { $group: { _id: '$projectId', count: { $sum: 1 } } },
      ]);

    // Create a map of projectId to document count
    const researchMap: { [projectId: number]: number } = {};
    for (const item of researchCountsByProjectId) {
      researchMap[item._id] = item.count;
    }

    // Continue with the rest of the method...
    const documentCountByCountry: { [country: string]: number } = {};
    for (const project of projects) {
      const country = project.country;
      const count = researchMap[project.id] || 0;
      documentCountByCountry[country] =
        (documentCountByCountry[country] || 0) + count;
    }

    // Combine results for all countries
    const results: CountryAnalytics[] = countries.map((country: string) => ({
      country,
      topVendors: topVendorsByCountry[country] || [],
      documentCount: documentCountByCountry[country] || 0,
    }));

    return results;
  }
}

class ResearchCountByProject {
  _id: number; // projectId
  documentCount: number;
}

class ResearchCountByCountry {
  country: string;
  documentCount: number;
}
