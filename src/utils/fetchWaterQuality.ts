import { WaterQualityData } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const fetchWaterQuality = async (stationId?: string, region?: string): Promise<WaterQualityData[]> => {
  try {
    const params = new URLSearchParams();
    if (stationId) params.append('stationId', stationId);
    if (region) params.append('region', region);
    
    const response = await fetch(`${API_URL}/water-quality?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch water quality data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching water quality data:', error);
    throw error;
  }
};