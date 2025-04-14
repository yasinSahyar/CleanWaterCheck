import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useFirebase } from '../../hooks/useFirebase';
import type { WaterQualityReport } from '../../types/index';
import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface WaterQualityReportFormData {
  title: string;
  stationId: string;
  region: string;
  address: string;
  turbidity: string;
  odor: string;
  notes?: string;
}

interface ReportFormProps {
  onSuccess?: () => void;
}

export const ReportForm: React.FC<ReportFormProps> = ({ onSuccess }) => {
  const { addReport, uploadImage } = useFirebase();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<WaterQualityReportFormData>();

  const getStatusForValue = (parameter: string, value: number): 'good' | 'fair' | 'poor' => {
    // Add your status calculation logic here
    if (value <= 1) return 'good';
    if (value <= 3) return 'fair';
    return 'poor';
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const onSubmit = async (data: WaterQualityReportFormData) => {
    try {
      setIsSubmitting(true);
      const report = {
        title: data.title,
        stationId: data.stationId,
        region: data.region,
        address: data.address,
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
        status: 'pending' as 'pending' | 'reviewed' | 'resolved' | 'rejected' | 'draft' | 'published' | 'archived'
      };
      
      const result = await addReport(report);
      
      // If there's an image to upload and we got a report ID
      if (selectedImage && result && result.reportId) {
        await uploadImage(result.reportId, selectedImage);
      }
      
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting report:', error);
      setError('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Submit Water Quality Report
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: 280 }}>
          <TextField
            fullWidth
            label="Title"
            {...register('title', { required: 'Title is required' })}
            error={!!errors.title}
            helperText={errors.title?.message}
            margin="normal"
          />
        </Box>

        <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: 280 }}>
          <TextField
            fullWidth
            label="Station ID"
            {...register('stationId', { required: 'Station ID is required' })}
            error={!!errors.stationId}
            helperText={errors.stationId?.message}
            margin="normal"
          />
        </Box>

        <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: 280 }}>
          <TextField
            fullWidth
            label="Region"
            {...register('region', { required: 'Region is required' })}
            error={!!errors.region}
            helperText={errors.region?.message}
            margin="normal"
          />
        </Box>

        <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: 280 }}>
          <TextField
            fullWidth
            label="Exact Address/Location"
            {...register('address', { required: 'Address is required' })}
            error={!!errors.address}
            helperText={errors.address?.message}
            margin="normal"
            placeholder="Enter the exact location where the issue was observed"
          />
        </Box>

        <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: 280 }}>
          <TextField
            fullWidth
            label="Turbidity"
            type="number"
            {...register('turbidity', { required: 'Turbidity is required' })}
            error={!!errors.turbidity}
            helperText={errors.turbidity?.message}
            margin="normal"
          />
        </Box>

        <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: 280 }}>
          <TextField
            fullWidth
            label="Odor"
            type="number"
            {...register('odor', { required: 'Odor is required' })}
            error={!!errors.odor}
            helperText={errors.odor?.message}
            margin="normal"
          />
        </Box>

        <Box sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Notes"
            multiline
            rows={4}
            {...register('notes')}
            margin="normal"
            placeholder="Provide additional details about the water quality issue"
          />
        </Box>

        <Box sx={{ width: '100%' }}>
          <Typography variant="subtitle1" gutterBottom>
            Upload Photo Evidence
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="image-upload"
            ref={fileInputRef}
          />
          <label htmlFor="image-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
              onClick={() => fileInputRef.current?.click()}
              sx={{ my: 1 }}
            >
              {selectedImage ? selectedImage.name : 'Choose Photo'}
            </Button>
          </label>
          {selectedImage && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected file: {selectedImage.name}
            </Typography>
          )}
        </Box>
      </Box>

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