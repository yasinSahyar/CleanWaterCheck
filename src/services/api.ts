const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const baseAPI = {
  get: async (endpoint: string, params?: Record<string, string>) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    const response = await fetch(`${API_URL}${endpoint}${queryString}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
    if (!response.ok) {
      throw new Error('API request failed');
    }
    return response.json();
  },

  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('API request failed');
    }
    return response.json();
  },

  put: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('API request failed');
    }
    return response.json();
  },

  delete: async (endpoint: string) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
    if (!response.ok) {
      throw new Error('API request failed');
    }
    return response.json();
  },
};

export const authAPI = {
  register: async (userData: any) => {
    return baseAPI.post('/auth/register', userData);
  },
  login: async (credentials: any) => {
    return baseAPI.post('/auth/login', credentials);
  },
  getCurrentUser: async () => {
    return baseAPI.get('/auth/me');
  }
};

export const reportAPI = {
  getReports: async (filters?: any) => {
    return baseAPI.get('/reports', filters);
  },
  createReport: async (reportData: any) => {
    return baseAPI.post('/reports', reportData);
  },
  updateReport: async (id: string, reportData: any) => {
    return baseAPI.put(`/reports/${id}`, reportData);
  },
  deleteReport: async (id: string) => {
    return baseAPI.delete(`/reports/${id}`);
  }
};

export default baseAPI; 