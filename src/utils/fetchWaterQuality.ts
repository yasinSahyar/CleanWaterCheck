import axios from 'axios';

interface WaterQualityData {
  stationId: string;
  parameter: string;
  value: number;
  unit: string;
  timestamp: string;
}

export const fetchWaterQuality = async (postalCode: string): Promise<WaterQualityData[]> => {
  try {
    // Replace with the actual API endpoint and query parameters
    const response = await axios.get(
      `https://rajapinnat.ymparisto.fi/api/vesla/2.0/odata/WaterQualityData?$filter=PostalCode eq '${postalCode}'`
    );

    // Extract and return the relevant data
    return response.data.value.map((item: any) => ({
      stationId: item.StationId,
      parameter: item.Parameter,
      value: item.Value,
      unit: item.Unit,
      timestamp: item.Timestamp,
    }));
  } catch (error) {
    console.error('Error fetching water quality data:', error);
    throw new Error('Failed to fetch water quality data');
  }
};