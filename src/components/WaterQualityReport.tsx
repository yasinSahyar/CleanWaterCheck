//WaterQualityReport.tsx
import React, { useState, useEffect } from 'react';
import { useFirebase } from '../hooks/useFirebase';
import type { WaterQualityReport as WaterQualityReportType } from '../types/index';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

interface WaterQualityReportProps {
  report: WaterQualityReportType;
  onUpdate?: (report: WaterQualityReportType) => void;
  onDelete?: (id: string) => void;
}

interface ParameterValue {
  value: number;
  unit: string;
  status: 'good' | 'fair' | 'poor';
}

export const WaterQualityReport: React.FC<WaterQualityReportProps> = ({
  report,
  onUpdate,
  onDelete
}) => {
  const { user } = useFirebase();
  const [isEditing, setIsEditing] = useState(false);
  const [editedReport, setEditedReport] = useState<WaterQualityReportType>(report);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (onUpdate) {
      await onUpdate(editedReport);
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete(report.id);
    }
  };

  const getStatusColor = (status: WaterQualityReportType['status']) => {
    switch (status) {
      case 'draft':
        return 'default';
      case 'published':
        return 'success';
      case 'archived':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="div">
            Station ID: {report.stationId}
          </Typography>
          <Chip
            label={report.status}
            color={getStatusColor(report.status)}
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Region: {report.region}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created by: {report.createdBy}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {new Date(report.timestamp).toLocaleDateString()}
          </Typography>
        </Box>

        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            Parameters:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {Object.entries(report.parameters).map(([key, paramValue]) => {
              const value = paramValue as ParameterValue;
              return (
                <Chip
                  key={key}
                  label={`${key}: ${value.value} ${value.unit} (${value.status})`}
                  variant="outlined"
                  size="small"
                />
              );
            })}
          </Box>
        </Box>

        {report.notes && (
          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              Notes:
            </Typography>
            <Typography variant="body2">
              {report.notes}
            </Typography>
          </Box>
        )}

        {user?.role === 'admin' && (
          <Box mt={2} display="flex" gap={1}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        )}
      </CardContent>

      <Dialog open={isEditing} onClose={() => setIsEditing(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Water Quality Report</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={editedReport.status}
                label="Status"
                onChange={(e) => setEditedReport({
                  ...editedReport,
                  status: e.target.value as WaterQualityReportType['status']
                })}
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Notes"
              multiline
              rows={4}
              value={editedReport.notes || ''}
              onChange={(e) => setEditedReport({
                ...editedReport,
                notes: e.target.value
              })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};