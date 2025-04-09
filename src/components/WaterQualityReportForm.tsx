import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

interface WaterQualityReportFormData {
  turbidity: string;
  odor: string;
  location: string;
}

interface WaterQualityReportFormProps {
  onSubmit: SubmitHandler<WaterQualityReportFormData>;
}

export const WaterQualityReportForm: React.FC<WaterQualityReportFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<WaterQualityReportFormData>();

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Submit Water Quality Report
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Turbidity"
          {...register('turbidity', { required: 'Turbidity is required' })}
          error={!!errors.turbidity}
          helperText={errors.turbidity?.message as string}
        />
        <TextField
          label="Odor"
          {...register('odor', { required: 'Odor is required' })}
          error={!!errors.odor}
          helperText={errors.odor?.message as string}
        />
        <TextField
          label="Location"
          {...register('location', { required: 'Location is required' })}
          error={!!errors.location}
          helperText={errors.location?.message as string}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Report
        </Button>
      </Box>
    </Paper>
  );
}; 