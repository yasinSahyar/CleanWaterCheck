const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

// Multer middleware setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    // Check file type
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    
    cb(new Error('Only image files are allowed!'));
  }
});

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
app.get('/api/reports', async (req, res) => {
  try {
    let query = 'SELECT * FROM water_quality_reports';
    const params = [];
    const conditions = [];
    
    // Filter by region if provided (kept for potential future use)
    if (req.query.region) {
      conditions.push('region = ?');
      params.push(req.query.region);
    }

    // Filter by postal code if provided
    if (req.query.postalCode) {
      conditions.push('postal_code = ?'); // Assuming 'postal_code' column exists
      params.push(req.query.postalCode);
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
    // Add image URLs - assuming image is stored as filename in db
    const reportsWithUrls = reports.map(report => ({
      ...report,
      photo_url: report.photo ? `/uploads/${report.photo}` : null 
    }));

    res.json(reportsWithUrls);
  } catch (error) {
    console.error('Get reports error:', error);
    // Check for specific table not found error
    if (error.code === 'ER_NO_SUCH_TABLE') {
        console.error("Error: The table 'water_quality_reports' does not exist. Please ensure it's created in the database.");
        return res.status(500).json({ message: "Database table 'water_quality_reports' not found. Please check the server setup." });
    } else if (error.code === 'ER_BAD_FIELD_ERROR' && error.message.includes('postal_code')) {
        console.error("Error: The column 'postal_code' does not exist in 'water_quality_reports'. Please update the table schema.");
        return res.status(500).json({ message: "Database column 'postal_code' not found. Please update the table schema." });
    }
    res.status(500).json({ message: 'Server error while fetching reports' });
  }
});

app.post('/api/reports', verifyToken, upload.single('photo'), async (req, res) => {
  try {
    const { title, address, notes, status = 'pending', postalCode } = req.body;
    const userId = req.user.id;
    const photoFilename = req.file ? req.file.filename : null;

    // Log received data for debugging
    console.log("Received report data:", { title, address, notes, status, postalCode, userId, photoFilename });

    // Validate required fields
    if (!title || !address || !postalCode) {
      return res.status(400).json({ message: 'Title, address, and postal code are required fields.' });
    }

    // Validate postal code format
    if (!/^\d{5}$/.test(postalCode)) {
      return res.status(400).json({ message: 'Please enter a valid 5-digit postal code.' });
    }

    // Insert report into database
    const [result] = await pool.query(
      'INSERT INTO water_quality_reports (user_id, title, address, notes, status, photo, postal_code, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
      [userId, title, address, notes, status, photoFilename, postalCode]
    );
    
    const reportId = result.insertId;
    
    res.status(201).json({
      message: 'Report created successfully',
      reportId
    });
  } catch (error) {
    console.error('Create report error:', error);
    if (error.code === 'ER_BAD_FIELD_ERROR' && error.message.includes('postal_code')) {
      console.error("Error: The column 'postal_code' does not exist in 'water_quality_reports'. Please update the table schema.");
      return res.status(500).json({ message: "Database column 'postal_code' not found. Please update the table schema." });
    }
    res.status(500).json({ message: 'Server error during report creation' });
  }
});

app.put('/api/reports/:id', verifyToken, upload.single('photo'), async (req, res) => {
  try {
    const reportId = req.params.id;
    const updates = req.body;
    const userId = req.user.id;
    const userRole = req.user.role; // Assuming role is available in the token

    // Check if user is admin or owner of the report
    const [reportResult] = await pool.query('SELECT user_id FROM water_quality_reports WHERE id = ?', [reportId]);
    if (reportResult.length === 0) {
        return res.status(404).json({ message: 'Report not found' });
    }
    const reportOwnerId = reportResult[0].user_id;

    if (userRole !== 'admin' && userId !== reportOwnerId) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to update this report.' });
    }

    // Build update query dynamically
    const fields = [];
    const values = [];
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    }

    // Handle photo update
    if (req.file) {
      // TODO: Delete old photo if it exists
      fields.push('photo = ?');
      values.push(req.file.filename);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: 'No update fields provided' });
    }

    values.push(reportId); // Add reportId for the WHERE clause

    const query = `UPDATE water_quality_reports SET ${fields.join(', ')} WHERE id = ?`;
    
    await pool.query(query, values);
    
    res.json({ message: 'Report updated successfully' });
  } catch (error) {
    console.error('Update report error:', error);
    res.status(500).json({ message: 'Server error during report update' });
  }
});

app.delete('/api/reports/:id', verifyToken, async (req, res) => {
  try {
    const reportId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role; // Assuming role is available in the token

    // Check if user is admin or owner of the report
    const [reportResult] = await pool.query('SELECT user_id, photo FROM water_quality_reports WHERE id = ?', [reportId]);
    if (reportResult.length === 0) {
        return res.status(404).json({ message: 'Report not found' });
    }
    const reportOwnerId = reportResult[0].user_id;
    const photoFilename = reportResult[0].photo;


    if (userRole !== 'admin' && userId !== reportOwnerId) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this report.' });
    }


    // Delete the report from the database
    await pool.query('DELETE FROM water_quality_reports WHERE id = ?', [reportId]);

    // Delete the associated photo file if it exists
    if (photoFilename) {
        const photoPath = path.join(__dirname, 'uploads', photoFilename);
        fs.unlink(photoPath, (err) => {
            if (err) {
                console.error('Error deleting photo file:', err);
                // Don't send error to client, just log it
            } else {
                console.log('Photo file deleted:', photoPath);
            }
        });
    }


    res.json({ message: 'Report deleted successfully' });
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

// Upload image for a report
app.post('/api/reports/:reportId/images', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const reportId = req.params.reportId;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Relative path to the file
    const filePath = `/uploads/${req.file.filename}`;
    
    // Insert image record into database
    await pool.query(
      'INSERT INTO report_images (report_id, file_path, uploaded_at) VALUES (?, ?, NOW())',
      [reportId, filePath]
    );
    
    // Update main report's photo field
    await pool.query(
      'UPDATE water_quality_reports SET photo = ? WHERE id = ?',
      [req.file.filename, reportId]
    );
    
    res.status(201).json({
      message: 'Image uploaded successfully',
      filePath
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ message: 'Server error during image upload' });
  }
});

// New endpoint for water utility info (dummy data)
app.get('/api/water-info/:postalCode', async (req, res) => {
  try {
    const { postalCode } = req.params;

    // Get water quality data for the postal code
    const [utilities] = await pool.query(
      'SELECT * FROM water_utilities WHERE postal_code = ?',
      [postalCode]
    );

    // Get city information
    const [cityInfo] = await pool.query(
      'SELECT city_name, latitude, longitude FROM cities WHERE postal_code = ?',
      [postalCode]
    );

    if (utilities.length === 0) {
      return res.json({
        city: cityInfo.length > 0 ? cityInfo[0].city_name : 'Unknown Area',
        quality: 'Unknown',
        utilities: [],
        lat: cityInfo.length > 0 ? cityInfo[0].latitude : null,
        lng: cityInfo.length > 0 ? cityInfo[0].longitude : null
      });
    }

    const response = {
      city: cityInfo.length > 0 ? cityInfo[0].city_name : 'Unknown Area',
      quality: utilities[0].water_quality || 'Unknown',
      utilities: utilities.map(u => ({
        name: u.name,
        areasServed: u.areas_served,
        populationServed: u.population_served,
        contaminantCount: u.contaminant_count,
        violationCount: u.violation_count
      })),
      lat: cityInfo.length > 0 ? cityInfo[0].latitude : null,
      lng: cityInfo.length > 0 ? cityInfo[0].longitude : null
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching water info:', error);
    res.status(500).json({ message: 'Error fetching water quality information' });
  }
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await pool.end();
  console.log('MySQL pool closed.');
  process.exit(0);
});

// Basic test query to check connection on startup
async function testDbConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('MySQL connected successfully.');
    await connection.query('SELECT 1'); // Simple query
    console.log('Database query successful.');
  } catch (error) {
    console.error('MySQL connection error:', error);
    // Consider exiting if DB connection fails critically
    // process.exit(1); 
  } finally {
    if (connection) connection.release();
  }
}

testDbConnection(); 