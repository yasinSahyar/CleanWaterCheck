// types.ts
export interface Report {
  turbidity: string;
  odor: string;
  location: string;
}

export interface WaterQualityData {
  stationId: string;
  parameter: string;
  value: number;
  unit: string;
  timestamp: string;
}

export interface PublicWaterUtility {
  name: string;
  areasServed: string;
  populationServed: number;
  contaminantCount: number;
  violationCount: number;
}

export interface PostalCodeData {
  postalCode: string;
  city: string;
  lat: number;
  lng: number;
  waterQuality: string;
  publicWaterUtilities?: PublicWaterUtility[];
}