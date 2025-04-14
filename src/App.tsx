// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import AuthForms from './components/auth/AuthForms';
import { ReportForm } from './components/reports/ReportForm';
import ReportManagement from './components/admin/ReportManagement';
import Navigation from './components/common/Navigation';
import LoadingScreen from './components/common/LoadingScreen';
import { useMySQL } from './hooks/useMySQL';
import HomePage from './components/HomePage';
import About from './components/About';
import Data from './components/Data';
import WhatsInTheWater from './components/WhatsInTheWater';
import './App.css';

const PrivateRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, loading } = useMySQL();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const { user, loading } = useMySQL();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <Router>
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={!user ? <AuthForms /> : <Navigate to="/" />} />
              <Route
                path="/report"
                element={
                  <PrivateRoute>
                    <ReportForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute allowedRoles={['admin']}>
                    <ReportManagement />
                  </PrivateRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/data" element={<Data />} />
              <Route path="/water-info" element={<WhatsInTheWater />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>© 2023 CleanWaterCheck. All rights reserved.</p>
          </footer>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;