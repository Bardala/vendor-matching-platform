import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TopVendor } from 'src/common/types/top-vendor.type';

@ApiTags('analytics')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('top-vendors')
  @ApiOperation({ summary: 'Get top vendors by country' })
  async getAnalytics(): Promise<
    { country: string; topVendors: TopVendor[]; documentCount: number }[]
  > {
    return this.analyticsService.getTopVendors();
  }

  @Get('research-counts')
  @ApiOperation({ summary: 'Get research counts grouped by country' })
  async getResearchCounts() {
    return await this.analyticsService.getResearchCountsByCountry();
  }

  @Get('vendor-trends')
  @ApiOperation({ summary: 'Get vendor performance trends over time' })
  async getVendorTrends() {
    return await this.analyticsService.getVendorPerformanceTrends();
  }
}
