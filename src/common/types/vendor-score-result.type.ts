export type VendorScoreResult = {
  country: string;
  vendor_id: number;
  vendor_name: string;
  avg_score: string | number; // SQL returns string, we parse to number
  rank?: number;
};
