// src/data/fetchWaterQualityData.ts
import { WaterQualityData } from '../types';

export const fetchWaterQualityData = async (locationId: string): Promise<WaterQualityData[]> => {
  const apiUrl = `https://vm4072.kaj.pouta.csc.fi/ddas/oapif/collections/fin_sykewaterquality/items/${locationId}?f=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.map((item: any) => ({
      stationId: item.stationId,
      parameter: item.parameter,
      value: item.value,
      unit: item.unit,
      timestamp: item.timestamp,
    }));
  } catch (error) {
    console.error('Error fetching water quality data:', error);
    throw new Error('Failed to fetch water quality data');
  }
};