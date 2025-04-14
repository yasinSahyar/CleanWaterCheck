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
    status ENUM('pending', 'reviewed', 'approved', 'rejected', 'draft', 'published', 'archived', 'resolved') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create report_images table if it doesn't exist
CREATE TABLE IF NOT EXISTS report_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 