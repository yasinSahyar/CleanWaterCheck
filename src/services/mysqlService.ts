import { User, UserRegistrationData, UserLoginData, WaterQualityReport } from '../types/index';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// MySQL veritabanına bağlanan servisleri içeren modül
const mysqlService = {
  // Kullanıcı işlemleri
  auth: {
    register: async (userData: UserRegistrationData): Promise<{ user: User; token: string }> => {
      try {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Kayıt başarısız oldu');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Kayıt hatası:', error);
        throw error;
      }
    },
    
    login: async (credentials: UserLoginData): Promise<{ user: User; token: string }> => {
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Giriş başarısız oldu');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Giriş hatası:', error);
        throw error;
      }
    },
    
    getCurrentUser: async (): Promise<{ user: User }> => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Kimlik doğrulama jetonu bulunamadı');
        }
        
        const response = await fetch(`${API_URL}/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Kullanıcı verisi alınamadı');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Kullanıcı alma hatası:', error);
        throw error;
      }
    }
  },
  
  // Su kalite raporları
  waterQualityReports: {
    getReports: async (filters?: any) => {
      try {
        const token = localStorage.getItem('token');
        let url = `${API_URL}/reports`;
        
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
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Raporlar alınamadı');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Rapor alma hatası:', error);
        throw error;
      }
    },
    
    addReport: async (reportData: any) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/reports`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(reportData)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Rapor eklenemedi');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Rapor ekleme hatası:', error);
        throw error;
      }
    },
    
    updateReport: async (id: string, reportData: any) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/reports/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(reportData)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Rapor güncellenemedi');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Rapor güncelleme hatası:', error);
        throw error;
      }
    },
    
    deleteReport: async (id: string) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/reports/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Rapor silinemedi');
        }
        
        return await response.json();
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
        const token = localStorage.getItem('token');
        let url = `${API_URL}/stations`;
        
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
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'İstasyonlar alınamadı');
        }
        
        return await response.json();
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
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/regions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Bölgeler alınamadı');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Bölge alma hatası:', error);
        throw error;
      }
    }
  }
};

export default mysqlService; 