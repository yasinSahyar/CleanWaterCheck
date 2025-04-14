const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { testConnection } = require('./config/db');

// Routes
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Veritabanı bağlantısını test et
testConnection();

// API Routes
app.use('/api/auth', authRoutes);

// Production için statik dosyaları servis et
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Sunucu hatası',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor.`);
}); 