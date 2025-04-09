const mysql = require('mysql2/promise');

async function setupDatabase() {
  let connection;
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true
    });

    console.log('Connected to MySQL server');

    // Create database if not exists
    await connection.query('CREATE DATABASE IF NOT EXISTS cleanwatercheck');
    await connection.query('USE cleanwatercheck');
    console.log('Using cleanwatercheck database');

    // Disable foreign key checks
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');

    // Drop existing tables
    await connection.query('DROP TABLE IF EXISTS water_quality_reports');
    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS stations');
    await connection.query('DROP TABLE IF EXISTS regions');
    console.log('Dropped existing tables');

    // Enable foreign key checks
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    // Create users table
    await connection.query(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        region VARCHAR(255) NOT NULL,
        role ENUM('customer', 'admin') DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Created users table');

    // Create regions table
    await connection.query(`
      CREATE TABLE regions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        code VARCHAR(50) NOT NULL UNIQUE
      )
    `);
    console.log('Created regions table');

    // Create stations table
    await connection.query(`
      CREATE TABLE stations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        region VARCHAR(255) NOT NULL,
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Created stations table');

    // Create water quality reports table
    await connection.query(`
      CREATE TABLE water_quality_reports (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        station_id INT NOT NULL,
        parameter VARCHAR(255) NOT NULL,
        value DECIMAL(10, 2) NOT NULL,
        unit VARCHAR(50) NOT NULL,
        region VARCHAR(255) NOT NULL,
        status ENUM('pending', 'reviewed', 'approved', 'rejected') DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Created water_quality_reports table');

    // Insert sample regions
    await connection.query(`
      INSERT INTO regions (name, code) VALUES
      ('Helsinki', 'HEL'),
      ('Espoo', 'ESP'),
      ('Tampere', 'TRE'),
      ('Vantaa', 'VAN'),
      ('Oulu', 'OUL'),
      ('Turku', 'TKU'),
      ('Jyväskylä', 'JYV'),
      ('Lahti', 'LHT'),
      ('Kuopio', 'KUO'),
      ('Pori', 'POR')
    `);
    console.log('Inserted sample regions');

    // Insert sample stations
    await connection.query(`
      INSERT INTO stations (name, region, latitude, longitude) VALUES
      ('Helsinki Central', 'Helsinki', 60.1699, 24.9384),
      ('Espoo Bay', 'Espoo', 60.2055, 24.6559),
      ('Tampere Lake', 'Tampere', 61.4978, 23.7610),
      ('Vantaa River', 'Vantaa', 60.2934, 24.9968)
    `);
    console.log('Inserted sample stations');

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
    process.exit();
  }
}

setupDatabase(); 