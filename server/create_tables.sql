-- Create water_quality_reports table if it doesn't exist
CREATE TABLE IF NOT EXISTS water_quality_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    station_id VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    parameter VARCHAR(255),
    value DECIMAL(10, 2),
    unit VARCHAR(50),
    region VARCHAR(255) NOT NULL,
    address VARCHAR(512),
    postal_code VARCHAR(5) NOT NULL,
    status ENUM('pending', 'reviewed', 'approved', 'rejected', 'draft', 'published', 'archived', 'resolved') DEFAULT 'pending',
    notes TEXT,
    photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (postal_code) REFERENCES cities(postal_code)
);

-- Create report_images table if it doesn't exist
CREATE TABLE IF NOT EXISTS report_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create cities table
CREATE TABLE IF NOT EXISTS cities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  postal_code VARCHAR(5) NOT NULL,
  city_name VARCHAR(100) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  UNIQUE KEY unique_postal_code (postal_code)
);

-- Create water utilities table
CREATE TABLE IF NOT EXISTS water_utilities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  postal_code VARCHAR(5) NOT NULL,
  name VARCHAR(100) NOT NULL,
  areas_served TEXT,
  population_served INT,
  water_quality ENUM('Unknown', 'Poor', 'Moderate', 'Good', 'Excellent') DEFAULT 'Unknown',
  contaminant_count INT DEFAULT 0,
  violation_count INT DEFAULT 0,
  FOREIGN KEY (postal_code) REFERENCES cities(postal_code)
);

-- Insert sample data for cities
INSERT INTO cities (postal_code, city_name, latitude, longitude) VALUES
('00100', 'Helsinki', 60.1699, 24.9384),
('02100', 'Espoo', 60.2055, 24.6559),
('33100', 'Tampere', 61.4978, 23.7610),
('01300', 'Vantaa', 60.2934, 25.0378),
('90100', 'Oulu', 65.0121, 25.4651)
ON DUPLICATE KEY UPDATE
  city_name = VALUES(city_name),
  latitude = VALUES(latitude),
  longitude = VALUES(longitude);

-- Insert sample data for water utilities
INSERT INTO water_utilities (postal_code, name, areas_served, population_served, water_quality, contaminant_count, violation_count) VALUES
('00100', 'HSY Water Services', 'Helsinki Metropolitan Area', 1100000, 'Excellent', 2, 0),
('02100', 'Espoo Water Services', 'Espoo Region', 289000, 'Good', 3, 1),
('33100', 'Tampere Water Utility', 'Pirkanmaa', 238140, 'Good', 4, 2),
('01300', 'Vantaa Water Services', 'Vantaa Region', 228000, 'Good', 3, 1),
('90100', 'Oulu Waterworks', 'Oulu Region', 203000, 'Excellent', 2, 0)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  areas_served = VALUES(areas_served),
  population_served = VALUES(population_served),
  water_quality = VALUES(water_quality),
  contaminant_count = VALUES(contaminant_count),
  violation_count = VALUES(violation_count); 