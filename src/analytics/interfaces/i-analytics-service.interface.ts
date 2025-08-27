import { TopVendor } from 'src/common/types/top-vendor.type';
import { VendorTrend } from 'src/common/types/vendor-trend.type';

export interface IAnalyticsService {
  getTopVendors(country: string, limit: number): Promise<TopVendor[]>;
  getResearchCountsByCountry(): Promise<
    { country: string; documentCount: number }[]
  >;
  getVendorPerformanceTrends(): Promise<VendorTrend[]>;
}
