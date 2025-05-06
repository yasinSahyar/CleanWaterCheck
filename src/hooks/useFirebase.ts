import { useState, useEffect } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs,
  DocumentData,
  Query,
  CollectionReference,
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../config/firebase';
import type { User, WaterQualityData, WaterQualityReport } from '../types/index';
import { authAPI, reportAPI } from '../services/api';

export const useFirebase = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize - Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const { user } = await authAPI.getCurrentUser();
          setUser(user);
        } catch (error) {
          console.error('Authentication error:', error);
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  // Sign up
  const signUp = async (email: string, password: string, name: string, region: string) => {
    try {
      setLoading(true);
      const { token, user } = await authAPI.register({ email, password, name, region });
      
      localStorage.setItem('token', token);
      setUser(user);
      
      return user;
    } catch (error: any) {
      setError(error.response?.data?.message || 'Signup failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { token, user } = await authAPI.login({ email, password });
      
      localStorage.setItem('token', token);
      setUser(user);
      
      return user;
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Log out
  const logOut = async () => {
    try {
      setLoading(true);
      
      localStorage.removeItem('token');
      setUser(null);
    } catch (error: any) {
      setError(error.message || 'Logout failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Water Quality Report Functions
  const createWaterQualityReport = async (report: Omit<WaterQualityReport, 'id' | 'createdAt' | 'timestamp'>) => {
    try {
      const docRef = await addDoc(collection(db, 'waterQualityReports'), {
        ...report,
        createdAt: Timestamp.now(),
        timestamp: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  };

  const updateReportStatus = async (reportId: string, status: WaterQualityReport['status'], adminNotes?: string) => {
    try {
      const docRef = doc(db, 'waterQualityReports', reportId);
      await updateDoc(docRef, {
        status,
        adminNotes,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      throw error;
    }
  };

  const getReports = async (region?: string, status?: WaterQualityReport['status']) => {
    try {
      const reportsCollection = collection(db, 'waterQualityReports');
      let q: Query<DocumentData> = reportsCollection;

      if (region) {
        q = query(q, where('region', '==', region));
      }
      if (status) {
        q = query(q, where('status', '==', status));
      }

      q = query(q, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        const report: WaterQualityReport = {
          id: doc.id,
          title: data.title,
          stationId: data.stationId,
          region: data.region,
          parameters: data.parameters,
          timestamp: data.timestamp?.toDate() || new Date(),
          createdAt: data.createdAt?.toDate() || new Date(),
          notes: data.notes,
          adminNotes: data.adminNotes,
          createdBy: data.createdBy,
          status: data.status
        };
        return report;
      });
    } catch (error) {
      throw error;
    }
  };

  const uploadImage = async (reportId: string, image: File) => {
    try {
      return await reportAPI.uploadImage(reportId, image);
    } catch (error: any) {
      setError(error.message || 'Failed to upload image');
      throw error;
    }
  };

  // Existing water quality data functions...
  const addWaterQualityData = async (data: Omit<WaterQualityData, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'waterQuality'), {
        ...data,
        timestamp: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  };

  const updateWaterQualityData = async (id: string, data: Partial<WaterQualityData>) => {
    try {
      const docRef = doc(db, 'waterQuality', id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      throw error;
    }
  };

  const deleteWaterQualityData = async (id: string) => {
    try {
      const docRef = doc(db, 'waterQuality', id);
      await deleteDoc(docRef);
    } catch (error) {
      throw error;
    }
  };

  const getWaterQualityData = async (stationId?: string, region?: string): Promise<WaterQualityData[]> => {
    try {
      const dataRef = collection(db, 'waterQualityData');
      let q: Query<DocumentData> = dataRef;

      if (stationId) {
        q = query(q, where('stationId', '==', stationId));
      }
      if (region) {
        q = query(q, where('region', '==', region));
      }

      q = query(q, orderBy('timestamp', 'desc'));

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date()
      })) as WaterQualityData[];
    } catch (error) {
      console.error('Error getting water quality data:', error);
      throw error;
    }
  };

  const getUserData = async (userId: string) => {
    try {
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('id', '==', userId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          region: userData.region,
          role: userData.role
        } as User;
      }
      return null;
    } catch (error) {
      throw error;
    }
  };

  const updateUserData = async (userId: string, data: Partial<User>) => {
    try {
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('id', '==', userId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'users', userDoc.id), {
          ...data,
          updatedAt: Timestamp.now()
        });
      }
    } catch (error) {
      throw error;
    }
  };

  // Get water quality reports
  const getWaterQualityReports = async (region?: string, status?: string): Promise<WaterQualityReport[]> => {
    try {
      const reportsRef = collection(db, 'waterQualityReports');
      let q: Query<DocumentData> = reportsRef;

      if (region) {
        q = query(q, where('region', '==', region));
      }
      if (status) {
        q = query(q, where('status', '==', status));
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as WaterQualityReport[];
    } catch (error) {
      console.error('Error getting water quality reports:', error);
      throw error;
    }
  };

  // Add report
  const addReport = async (reportData: Omit<WaterQualityReport, 'id' | 'createdAt' | 'timestamp'>) => {
    try {
      if (!user) {
        throw new Error('User is not authenticated');
      }
      
      const { report } = await reportAPI.createReport({
        ...reportData,
        user_id: user.id
      });
      
      return report.id;
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to add report');
      throw error;
    }
  };

  // Update report
  const updateReport = async (id: string, reportData: Partial<WaterQualityReport>) => {
    try {
      await reportAPI.updateReport(id, reportData);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update report');
      throw error;
    }
  };

  // Delete report
  const deleteReport = async (id: string) => {
    try {
      await reportAPI.deleteReport(id);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to delete report');
      throw error;
    }
  };

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    logOut,
    addWaterQualityData,
    updateWaterQualityData,
    deleteWaterQualityData,
    getWaterQualityData,
    getUserData,
    updateUserData,
    // New report functions
    createWaterQualityReport,
    updateReportStatus,
    getReports,
    uploadImage,
    getWaterQualityReports,
    addReport,
    updateReport,
    deleteReport
  };
};

export default useFirebase; 