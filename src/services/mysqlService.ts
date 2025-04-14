import { User, UserRegistrationData, UserLoginData } from '../types/index';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// MySQL veritabanına bağlanan servisleri içeren modül
const mysqlService = {
  auth: {
    register: async (userData: UserRegistrationData): Promise<{ user: User; token: string }> => {
      try {
        const response = await axiosInstance.post('/auth/register', userData);
        return response.data as { user: User; token: string };
      } catch (error) {
        console.error('Kayıt hatası:', error);
        throw error;
      }
    },
    
    login: async (credentials: UserLoginData): Promise<{ user: User; token: string }> => {
      try {
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data as { user: User; token: string };
      } catch (error) {
        console.error('Giriş hatası:', error);
        throw error;
      }
    },
    
    getCurrentUser: async (): Promise<{ user: User }> => {
      try {
        const response = await axiosInstance.get('/auth/me');
        return response.data as { user: User };
      } catch (error) {
        console.error('Kullanıcı alma hatası:', error);
        throw error;
      }
    },
    
    logOut: async () => {
      localStorage.removeItem('token');
      return true;
    }
  },
  
  // Su kalite raporları
  waterQualityReports: {
    getReports: async (filters?: any) => {
      try {
        let url = '/reports';
        
        if (filters) {
          const queryParams = new URLSearchParams();
          Object.entries(filters).forEach(([key, value]) => {
            if (value) {
              queryParams.append(key, value as string);
            }
          });
          
          if (queryParams.toString()) {
            url += `?${queryParams.toString()}`;
          }
        }
        
        const response = await axiosInstance.get(url);
        
        if (!response.data) {
          throw new Error('Raporlar alınamadı');
        }
        
        return response.data;
      } catch (error) {
        console.error('Rapor alma hatası:', error);
        throw error;
      }
    },
    
    addReport: async (reportData: any) => {
      try {
        const response = await axiosInstance.post('/reports', reportData);
        
        if (!response.data) {
          throw new Error('Rapor eklenemedi');
        }
        
        return response.data;
      } catch (error) {
        console.error('Rapor ekleme hatası:', error);
        throw error;
      }
    },
    
    updateReport: async (id: string, reportData: any) => {
      try {
        const response = await axiosInstance.put(`/reports/${id}`, reportData);
        
        if (!response.data) {
          throw new Error('Rapor güncellenemedi');
        }
        
        return response.data;
      } catch (error) {
        console.error('Rapor güncelleme hatası:', error);
        throw error;
      }
    },
    
    deleteReport: async (id: string) => {
      try {
        const response = await axiosInstance.delete(`/reports/${id}`);
        
        if (!response.data) {
          throw new Error('Rapor silinemedi');
        }
        
        return response.data;
      } catch (error) {
        console.error('Rapor silme hatası:', error);
        throw error;
      }
    }
  },
  
  // İstasyonlar
  stations: {
    getStations: async (filters?: any) => {
      try {
        let url = '/stations';
        
        if (filters) {
          const queryParams = new URLSearchParams();
          Object.entries(filters).forEach(([key, value]) => {
            if (value) {
              queryParams.append(key, value as string);
            }
          });
          
          if (queryParams.toString()) {
            url += `?${queryParams.toString()}`;
          }
        }
        
        const response = await axiosInstance.get(url);
        
        if (!response.data) {
          throw new Error('İstasyonlar alınamadı');
        }
        
        return response.data;
      } catch (error) {
        console.error('İstasyon alma hatası:', error);
        throw error;
      }
    }
  },
  
  // Bölgeler
  regions: {
    getRegions: async () => {
      try {
        const response = await axiosInstance.get('/regions');
        
        if (!response.data) {
          throw new Error('Bölgeler alınamadı');
        }
        
        return response.data;
      } catch (error) {
        console.error('Bölge alma hatası:', error);
        throw error;
      }
    }
  }
};

export default mysqlService; 