import { CountryAnalytics } from 'src/common/types/country-analytics.type';
import { VendorTrend } from 'src/common/types/vendor-trend.type';

export interface IAnalyticsService {
  getTopVendors(): Promise<CountryAnalytics[]>;
  getResearchCountsByCountry(): Promise<
    { country: string; documentCount: number }[]
  >;
  getVendorPerformanceTrends(): Promise<VendorTrend[]>;
}
