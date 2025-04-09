import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMySQL } from '../../hooks/useMySQL';
import { UserLoginData, UserRegistrationData } from '../../types/index';

// Sign in form interface
type SignInFormInputs = UserLoginData;

// Sign up form interface
type SignUpFormInputs = Omit<UserRegistrationData, 'role'>;

// Tab panel component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const AuthForms: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, register: registerUser } = useMySQL();

  // Sign in form
  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    formState: { errors: errorsSignIn }
  } = useForm<SignInFormInputs>();

  // Sign up form
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp }
  } = useForm<SignUpFormInputs>();

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError(null);
  };

  // Handle sign in
  const onSignIn = async (data: SignInFormInputs) => {
    try {
      setLoading(true);
      setError(null);
      await login(data.email, data.password);
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Handle sign up
  const onSignUp = async (data: SignUpFormInputs) => {
    try {
      setLoading(true);
      setError(null);
      const registrationData: UserRegistrationData = {
        ...data,
        role: 'customer'
      };
      await registerUser(registrationData);
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Registration failed. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Finnish regions
  const regions = [
    'Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu', 'Turku', 'Jyväskylä',
    'Lahti', 'Kuopio', 'Pori', 'Kouvola', 'Joensuu', 'Lappeenranta', 'Vaasa'
  ];

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Paper elevation={3}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        {error && (
          <Box sx={{ p: 2 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {/* Sign In Form */}
        <TabPanel value={tabValue} index={0}>
          <form onSubmit={handleSubmitSignIn(onSignIn)}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...registerSignIn('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email address'
                }
              })}
              error={!!errorsSignIn.email}
              helperText={errorsSignIn.email?.message || ''}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              {...registerSignIn('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              error={!!errorsSignIn.password}
              helperText={errorsSignIn.password?.message || ''}
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </form>
        </TabPanel>

        {/* Sign Up Form */}
        <TabPanel value={tabValue} index={1}>
          <form onSubmit={handleSubmitSignUp(onSignUp)}>
            <TextField
              fullWidth
              label="Name"
              {...registerSignUp('name', {
                required: 'Name is required'
              })}
              error={!!errorsSignUp.name}
              helperText={errorsSignUp.name?.message || ''}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              {...registerSignUp('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email address'
                }
              })}
              error={!!errorsSignUp.email}
              helperText={errorsSignUp.email?.message || ''}
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="region-label">Region</InputLabel>
              <Select
                labelId="region-label"
                label="Region"
                {...registerSignUp('region', {
                  required: 'Region is required'
                })}
                error={!!errorsSignUp.region}
              >
                {regions.map((region) => (
                  <MenuItem key={region} value={region}>
                    {region}
                  </MenuItem>
                ))}
              </Select>
              {errorsSignUp.region && (
                <Typography color="error" variant="caption">
                  {errorsSignUp.region.message || ''}
                </Typography>
              )}
            </FormControl>

            <TextField
              fullWidth
              label="Password"
              type="password"
              {...registerSignUp('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              error={!!errorsSignUp.password}
              helperText={errorsSignUp.password?.message || ''}
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
          </form>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default AuthForms; 