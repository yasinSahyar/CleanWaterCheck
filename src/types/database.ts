import { Timestamp } from 'firebase/firestore';

export interface DBUser {
  id: string;
  email: string;
  name: string;
  region: string;
  role: 'customer' | 'admin';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface DBStation {
  id: string;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
  type: 'municipal' | 'industrial' | 'natural';
  status: 'active' | 'inactive' | 'maintenance';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface DBWaterQualityReport {
  id: string;
  title: string;
  stationId: string;
  userId: string;
  region: string;
  parameters: {
    turbidity?: {
      value: number;
      unit: string;
      status: 'good' | 'fair' | 'poor';
    };
    pH?: {
      value: number;
      unit: string;
      status: 'good' | 'fair' | 'poor';
    };
    dissolvedOxygen?: {
      value: number;
      unit: 'mg/L';
      status: 'good' | 'fair' | 'poor';
    };
    temperature?: {
      value: number;
      unit: '°C';
      status: 'good' | 'fair' | 'poor';
    };
    conductivity?: {
      value: number;
      unit: 'µS/cm';
      status: 'good' | 'fair' | 'poor';
    };
    totalDissolvedSolids?: {
      value: number;
      unit: 'mg/L';
      status: 'good' | 'fair' | 'poor';
    };
    [key: string]: {
      value: number;
      unit: string;
      status: 'good' | 'fair' | 'poor';
    } | undefined;
  };
  images?: string[]; // URLs to uploaded images
  notes?: string;
  adminNotes?: string;
  status: 'draft' | 'published' | 'archived' | 'pending' | 'reviewed' | 'resolved' | 'rejected';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface DBRegion {
  id: string;
  name: string;
  code: string;
  population: number;
  waterSources: {
    type: 'lake' | 'river' | 'groundwater' | 'sea';
    name: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  }[];
  waterUtilities: {
    name: string;
    type: 'municipal' | 'private';
    populationServed: number;
    treatmentCapacity: number; // cubic meters per day
  }[];
  statistics: {
    waterQualityIndex: number; // 0-100
    complianceRate: number; // percentage
    treatmentEfficiency: number; // percentage
    lastUpdated: Timestamp;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
} 