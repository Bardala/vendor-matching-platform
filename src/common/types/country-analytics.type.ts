import { TopVendor } from './top-vendor.type';

export type CountryAnalytics = {
  country: string;
  topVendors: TopVendor[];
  documentCount: number;
};
