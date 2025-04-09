-- Drop existing tables if they exist
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS water_quality_reports;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS stations;
DROP TABLE IF EXISTS regions;
SET FOREIGN_KEY_CHECKS = 1;

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    role ENUM('customer', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create regions table
CREATE TABLE regions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    code VARCHAR(50) NOT NULL UNIQUE
);

-- Create stations table
CREATE TABLE stations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create water quality reports table
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
);

-- Insert some sample regions
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
('Pori', 'POR');

-- Insert some sample stations
INSERT INTO stations (name, region, latitude, longitude) VALUES
('Helsinki Central', 'Helsinki', 60.1699, 24.9384),
('Espoo Bay', 'Espoo', 60.2055, 24.6559),
('Tampere Lake', 'Tampere', 61.4978, 23.7610),
('Vantaa River', 'Vantaa', 60.2934, 24.9968); 