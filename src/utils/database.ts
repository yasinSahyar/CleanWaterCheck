import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { db, collections } from '../config/firebase';
import type { DBUser, DBStation, DBWaterQualityReport, DBRegion } from '../types/database';

// Generic type for database operations
type DBCollection = typeof collections[keyof typeof collections];
type DBDocument = DBUser | DBStation | DBWaterQualityReport | DBRegion;

// Create a new document
export async function createDocument<T extends DBDocument>(
  collectionName: DBCollection,
  data: Omit<T, 'id'>
) {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error);
    throw error;
  }
}

// Get a document by ID
export async function getDocument<T extends DBDocument>(
  collectionName: DBCollection,
  id: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    throw error;
  }
}

// Update a document
export async function updateDocument<T extends DBDocument>(
  collectionName: DBCollection,
  id: string,
  data: Partial<T>
) {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
}

// Delete a document
export async function deleteDocument(
  collectionName: DBCollection,
  id: string
) {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
}

// Query documents
export async function queryDocuments<T extends DBDocument>(
  collectionName: DBCollection,
  constraints: QueryConstraint[]
): Promise<T[]> {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T);
  } catch (error) {
    console.error(`Error querying documents from ${collectionName}:`, error);
    throw error;
  }
}

// Helper function to create query constraints
export function createQueryConstraints(
  filters: { field: string; operator: '==' | '>' | '<' | '>=' | '<='; value: any }[],
  sortBy?: { field: string; direction: 'asc' | 'desc' }
): QueryConstraint[] {
  const constraints: QueryConstraint[] = [];
  
  // Add filters
  filters.forEach(filter => {
    constraints.push(where(filter.field, filter.operator, filter.value));
  });
  
  // Add sorting
  if (sortBy) {
    constraints.push(orderBy(sortBy.field, sortBy.direction));
  }
  
  return constraints;
}

// Example usage:
// const reports = await queryDocuments<DBWaterQualityReport>(
//   collections.waterQualityReports,
//   createQueryConstraints(
//     [{ field: 'region', operator: '==', value: 'Helsinki' }],
//     { field: 'createdAt', direction: 'desc' }
//   )
// ); 