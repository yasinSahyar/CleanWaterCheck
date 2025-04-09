import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
  MenuItem,
} from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';

const regions = [
  'İstanbul',
  'Ankara',
  'İzmir',
  'Bursa',
  'Antalya',
  'Adana',
  'Konya',
  'Gaziantep',
  'Şanlıurfa',
  'Kayseri',
];

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Geçerli bir e-posta adresi giriniz')
    .required('E-posta adresi gereklidir'),
  password: Yup.string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .required('Şifre gereklidir'),
  name: Yup.string()
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .required('İsim gereklidir'),
  region: Yup.string().required('Bölge seçimi gereklidir'),
});

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      region: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        const newUser: User = {
          id: userCredential.user.uid,
          email: values.email,
          role: 'customer',
          name: values.name,
          region: values.region,
        };

        await setDoc(doc(db, 'users', newUser.id), newUser);
        navigate('/dashboard');
      } catch (error) {
        console.error('Kayıt hatası:', error);
        alert('Kayıt yapılamadı. Lütfen bilgilerinizi kontrol edin.');
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Kayıt Ol
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="E-posta"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Şifre"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Ad Soyad"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                id="region"
                name="region"
                select
                label="Bölge"
                value={formik.values.region}
                onChange={formik.handleChange}
                error={formik.touched.region && Boolean(formik.errors.region)}
                helperText={formik.touched.region && formik.errors.region}
              >
                {regions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Kayıt Ol
              </Button>
              <Link href="/login" variant="body2">
                Zaten hesabınız var mı? Giriş yapın
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}; 