export interface WaterQualityReport {
  id: string;
  title: string;
  stationId: string;
  region: string;
  parameters: {
    [key: string]: {
      value: number;
      unit: string;
      status: 'good' | 'fair' | 'poor';
    };
  };
  timestamp: Date;
  createdAt: Date;
  notes?: string;
  adminNotes?: string;
  createdBy: string;
  status: 'draft' | 'published' | 'archived' | 'pending' | 'reviewed' | 'resolved' | 'rejected';
} 