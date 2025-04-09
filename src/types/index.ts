export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  region: string;
  role: UserRole;
}

export interface UserRegistrationData extends Omit<User, 'id'> {
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface WaterQualityData {
  id: string;
  stationId: string;
  parameter: string;
  value: number;
  unit: string;
  region: string;
  timestamp: Date;
}

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