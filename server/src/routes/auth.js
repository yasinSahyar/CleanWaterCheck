const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateJWT } = require('../middleware/auth');

// POST /api/auth/register - Yeni kullanıcı oluşturma
router.post('/register', authController.register);

// POST /api/auth/login - Kullanıcı girişi
router.post('/login', authController.login);

// GET /api/auth/me - Mevcut kullanıcı bilgilerini alma
router.get('/me', authenticateJWT, authController.getCurrentUser);

module.exports = router; 