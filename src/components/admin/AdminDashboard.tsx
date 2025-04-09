import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { WaterReport } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [reports, setReports] = useState<WaterReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<WaterReport | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const reportsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as WaterReport[];
      setReports(reportsData);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (reportId: string, newStatus: WaterReport['status']) => {
    try {
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, {
        status: newStatus,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating report status:', error);
    }
  };

  const getStatusColor = (status: WaterReport['status']) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in_progress':
        return 'info';
      case 'resolved':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Water Quality Reports Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.title}</TableCell>
                <TableCell>{report.description}</TableCell>
                <TableCell>{report.location.address}</TableCell>
                <TableCell>
                  <Chip
                    label={report.status}
                    color={getStatusColor(report.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {report.createdAt instanceof Date ? report.createdAt.toLocaleDateString() : new Date(report.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setSelectedReport(report);
                      setOpenDialog(true);
                    }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        {selectedReport && (
          <>
            <DialogTitle>{selectedReport.title}</DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Description
                </Typography>
                <Typography paragraph>{selectedReport.description}</Typography>

                <Typography variant="subtitle1" gutterBottom>
                  Location
                </Typography>
                <Typography paragraph>{selectedReport.location.address}</Typography>

                <Typography variant="subtitle1" gutterBottom>
                  Images
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {selectedReport.images.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Report image ${index + 1}`}
                      style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                    />
                  ))}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleStatusChange(selectedReport.id, 'in_progress')}
                disabled={selectedReport.status === 'in_progress'}
              >
                Mark In Progress
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleStatusChange(selectedReport.id, 'resolved')}
                disabled={selectedReport.status === 'resolved'}
              >
                Mark Resolved
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}; 