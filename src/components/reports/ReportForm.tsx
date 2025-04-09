import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFirebase } from '../../hooks/useFirebase';
import type { WaterQualityReport } from '../../types/index';
import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';

interface WaterQualityReportFormData {
  title: string;
  stationId: string;
  region: string;
  turbidity: string;
  odor: string;
  notes?: string;
}

interface ReportFormProps {
  onSuccess?: () => void;
}

export const ReportForm: React.FC<ReportFormProps> = ({ onSuccess }) => {
  const { addReport } = useFirebase();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<WaterQualityReportFormData>();

  const getStatusForValue = (parameter: string, value: number): 'good' | 'fair' | 'poor' => {
    // Add your status calculation logic here
    if (value <= 1) return 'good';
    if (value <= 3) return 'fair';
    return 'poor';
  };

  const onSubmit = async (data: WaterQualityReportFormData) => {
    try {
      setIsSubmitting(true);
      await addReport({
        title: data.title,
        stationId: data.stationId,
        region: data.region,
        parameters: {
          turbidity: {
            value: parseFloat(data.turbidity),
            unit: 'NTU',
            status: getStatusForValue('turbidity', parseFloat(data.turbidity))
          },
          odor: {
            value: parseFloat(data.odor),
            unit: 'TON',
            status: getStatusForValue('odor', parseFloat(data.odor))
          }
        },
        notes: data.notes,
        createdBy: '', // Will be set by the backend
        status: 'draft'
      });
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting report:', error);
      setError('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Submit Water Quality Report
      </Typography>

      <TextField
        fullWidth
        label="Title"
        {...register('title', { required: 'Title is required' })}
        error={!!errors.title}
        helperText={errors.title?.message}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Station ID"
        {...register('stationId', { required: 'Station ID is required' })}
        error={!!errors.stationId}
        helperText={errors.stationId?.message}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Region"
        {...register('region', { required: 'Region is required' })}
        error={!!errors.region}
        helperText={errors.region?.message}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Turbidity"
        type="number"
        {...register('turbidity', { required: 'Turbidity is required' })}
        error={!!errors.turbidity}
        helperText={errors.turbidity?.message}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Odor"
        type="number"
        {...register('odor', { required: 'Odor is required' })}
        error={!!errors.odor}
        helperText={errors.odor?.message}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Notes"
        multiline
        rows={4}
        {...register('notes')}
        margin="normal"
      />

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        sx={{ mt: 3 }}
      >
        {isSubmitting ? <CircularProgress size={24} /> : 'Submit Report'}
      </Button>
    </Box>
  );
}; 