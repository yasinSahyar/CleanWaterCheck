const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cleanwatercheck',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-development';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// ROUTES

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, region, role = 'customer' } = req.body;
    
    // Check if user already exists
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert user into database
    const [result] = await pool.query(
      'INSERT INTO users (email, password, name, region, role) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, name, region, role]
    );
    
    const userId = result.insertId;
    
    // Generate JWT token
    const token = jwt.sign(
      { id: userId, email, name, region, role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: userId, email, name, region, role },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const user = users[0];
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, region: user.region, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        region: user.region,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

app.get('/api/auth/me', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user from database
    const [users] = await pool.query('SELECT id, email, name, region, role FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      user: users[0]
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Water quality reports routes
app.get('/api/reports', verifyToken, async (req, res) => {
  try {
    let query = 'SELECT * FROM water_quality_reports';
    const params = [];
    const conditions = [];
    
    // Filter by region if provided
    if (req.query.region) {
      conditions.push('region = ?');
      params.push(req.query.region);
    }
    
    // Filter by status if provided
    if (req.query.status) {
      conditions.push('status = ?');
      params.push(req.query.status);
    }
    
    // Add WHERE clause if conditions exist
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    // Add order by date
    query += ' ORDER BY created_at DESC';
    
    const [reports] = await pool.query(query, params);
    res.json(reports);
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/reports', verifyToken, async (req, res) => {
  try {
    const { stationId, parameter, value, unit, region, status = 'pending', notes = '' } = req.body;
    const userId = req.user.id;
    
    // Insert report into database
    const [result] = await pool.query(
      'INSERT INTO water_quality_reports (user_id, station_id, parameter, value, unit, region, status, notes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
      [userId, stationId, parameter, value, unit, region, status, notes]
    );
    
    const reportId = result.insertId;
    
    res.status(201).json({
      message: 'Report created successfully',
      reportId
    });
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({ message: 'Server error during report creation' });
  }
});

app.put('/api/reports/:id', verifyToken, async (req, res) => {
  try {
    const reportId = req.params.id;
    const updates = req.body;
    
    // Check if user is admin for status updates
    if (updates.status && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update report status' });
    }
    
    // Update fields
    const fields = [];
    const values = [];
    
    Object.entries(updates).forEach(([key, value]) => {
      if (['stationId', 'parameter', 'value', 'unit', 'region', 'status', 'notes'].includes(key)) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });
    
    if (fields.length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }
    
    // Add reportId to values
    values.push(reportId);
    
    // Update report
    await pool.query(
      `UPDATE water_quality_reports SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    res.json({
      message: 'Report updated successfully'
    });
  } catch (error) {
    console.error('Update report error:', error);
    res.status(500).json({ message: 'Server error during report update' });
  }
});

app.delete('/api/reports/:id', verifyToken, async (req, res) => {
  try {
    const reportId = req.params.id;
    
    // Check if user is admin or report owner
    if (req.user.role !== 'admin') {
      const [reports] = await pool.query(
        'SELECT user_id FROM water_quality_reports WHERE id = ?',
        [reportId]
      );
      
      if (reports.length === 0) {
        return res.status(404).json({ message: 'Report not found' });
      }
      
      if (reports[0].user_id !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to delete this report' });
      }
    }
    
    // Delete report
    await pool.query('DELETE FROM water_quality_reports WHERE id = ?', [reportId]);
    
    res.json({
      message: 'Report deleted successfully'
    });
  } catch (error) {
    console.error('Delete report error:', error);
    res.status(500).json({ message: 'Server error during report deletion' });
  }
});

// Stations routes
app.get('/api/stations', verifyToken, async (req, res) => {
  try {
    let query = 'SELECT * FROM stations';
    const params = [];
    
    // Filter by region if provided
    if (req.query.region) {
      query += ' WHERE region = ?';
      params.push(req.query.region);
    }
    
    const [stations] = await pool.query(query, params);
    res.json(stations);
  } catch (error) {
    console.error('Get stations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Regions routes
app.get('/api/regions', async (req, res) => {
  try {
    const [regions] = await pool.query('SELECT * FROM regions');
    res.json(regions);
  } catch (error) {
    console.error('Get regions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 