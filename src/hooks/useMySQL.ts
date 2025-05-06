import { useState, useEffect } from 'react';
import mysqlService from '../services/mysqlService';
import type { User, WaterQualityData, WaterQualityReport, UserRegistrationData, UserLoginData } from '../types/index';

export const useMySQL = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Sayfa yüklendiğinde kullanıcı bilgilerini kontrol et
  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Token varsa mevcut kullanıcıyı getir
          const { user: userData } = await mysqlService.auth.getCurrentUser();
          setUser(userData);
        }
      } catch (err) {
        console.error('Session check error:', err);
        // Hata durumunda token'ı temizle
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // Kullanıcı kaydı
  const register = async (userData: UserRegistrationData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await mysqlService.auth.register(userData);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return response;
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Kullanıcı girişi
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const loginData: UserLoginData = { email, password };
      const response = await mysqlService.auth.login(loginData);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return response;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Çıkış yap
  const logOut = async () => {
    try {
      await mysqlService.auth.logOut();
      setUser(null);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Logout failed');
      throw err;
    }
  };

  // Su kalitesi raporlarını getir
  const getWaterQualityReports = async (filters?: { region?: string; status?: string }) => {
    setLoading(true);
    setError(null);
    try {
      return await mysqlService.waterQualityReports.getReports(filters);
    } catch (err: any) {
      setError(err.message || 'Raporlar alınırken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Yeni su kalitesi raporu ekle
  const addReport = async (report: Omit<WaterQualityReport, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      return await mysqlService.waterQualityReports.addReport(report);
    } catch (err: any) {
      setError(err.message || 'Rapor eklenirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Su kalitesi raporunu güncelle
  const updateReport = async (id: string, reportData: Partial<WaterQualityReport>) => {
    setLoading(true);
    setError(null);
    try {
      return await mysqlService.waterQualityReports.updateReport(id, reportData);
    } catch (err: any) {
      setError(err.message || 'Rapor güncellenirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Su kalitesi raporunu sil
  const deleteReport = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await mysqlService.waterQualityReports.deleteReport(id);
    } catch (err: any) {
      setError(err.message || 'Rapor silinirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // İstasyon verilerini getir
  const getStations = async (filters?: { region?: string }) => {
    setLoading(true);
    setError(null);
    try {
      return await mysqlService.stations.getStations(filters);
    } catch (err: any) {
      setError(err.message || 'İstasyonlar alınırken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Bölgeleri getir
  const getRegions = async () => {
    setLoading(true);
    setError(null);
    try {
      return await mysqlService.regions.getRegions();
    } catch (err: any) {
      setError(err.message || 'Bölgeler alınırken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    register,
    login,
    logOut,
    getWaterQualityReports,
    addReport,
    updateReport,
    deleteReport,
    getStations,
    getRegions,
    token: localStorage.getItem('token')
  };
}; 