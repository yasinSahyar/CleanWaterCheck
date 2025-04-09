// src/types.ts
export interface WaterQualityData {
    id: string;
    properties: {
      location: string;
      parameter: string;
      value: number;
      unit: string;
      timestamp: string;
    };
    geometry: {
      type: string;
      coordinates: [number, number];
    };
  }