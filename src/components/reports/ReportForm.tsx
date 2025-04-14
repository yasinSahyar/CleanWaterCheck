import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Box, Typography, CircularProgress, Alert, Snackbar } from '@mui/material';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<WaterQualityReportFormData>();

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
      setError(null);

      // First, create the report
      const response = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title: data.title,
          stationId: data.stationId,
          region: data.region,
          address: data.address,
          turbidity: parseFloat(data.turbidity),
          odor: parseFloat(data.odor),
          notes: data.notes,
          status: 'pending'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create report');
      }

      const result = await response.json();

      // If there's an image to upload and we got a report ID
      if (selectedImage && result.reportId) {
        const formData = new FormData();
        formData.append('image', selectedImage);

        const imageResponse = await fetch(`http://localhost:5000/api/reports/${result.reportId}/images`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });

        if (!imageResponse.ok) {
          throw new Error('Failed to upload image');
        }
      }

      // Show success message
      setShowSuccess(true);
      
      // Reset form
      reset();
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Call onSuccess callback if provided
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

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        <Box>
          <TextField
            fullWidth
            label="Title"
            {...register('title', { required: 'Title is required' })}
            error={!!errors.title}
            helperText={errors.title?.message}
            margin="normal"
          />
        </Box>

        <Box>
          <TextField
            fullWidth
            label="Station ID"
            {...register('stationId', { required: 'Station ID is required' })}
            error={!!errors.stationId}
            helperText={errors.stationId?.message}
            margin="normal"
          />
        </Box>

        <Box>
          <TextField
            fullWidth
            label="Region"
            {...register('region', { required: 'Region is required' })}
            error={!!errors.region}
            helperText={errors.region?.message}
            margin="normal"
          />
        </Box>

        <Box>
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

        <Box>
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

        <Box>
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

        <Box sx={{ gridColumn: '1 / -1' }}>
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

        <Box sx={{ gridColumn: '1 / -1' }}>
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

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{ minWidth: 200 }}
        >
          {isSubmitting ? <CircularProgress size={24} /> : 'Submit Report'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Report submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}; 