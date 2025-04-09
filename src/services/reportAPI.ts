import { WaterQualityReport } from '../types/report';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

interface ReportFilters {
  region?: string;
  status?: string;
  stationId?: string;
}

const reportAPI = {
  getReports: async (filters: ReportFilters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value);
      }
    });
    
    const response = await fetch(`${API_URL}/reports?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch reports');
    }
    return response.json();
  },

  getReportById: async (id: string): Promise<WaterQualityReport> => {
    const response = await fetch(`${API_URL}/reports/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch report');
    }
    return response.json();
  },

  createReport: async (report: Omit<WaterQualityReport, 'id'>): Promise<WaterQualityReport> => {
    const response = await fetch(`${API_URL}/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    });
    if (!response.ok) {
      throw new Error('Failed to create report');
    }
    return response.json();
  },

  updateReport: async (id: string, report: Partial<WaterQualityReport>): Promise<WaterQualityReport> => {
    const response = await fetch(`${API_URL}/reports/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    });
    if (!response.ok) {
      throw new Error('Failed to update report');
    }
    return response.json();
  },

  deleteReport: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/reports/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete report');
    }
  }
};

export default reportAPI; 