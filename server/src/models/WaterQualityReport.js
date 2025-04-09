const { pool } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class WaterQualityReport {
  // Rapor oluştur
  static async create(reportData) {
    const { 
      title, 
      station_id, 
      user_id, 
      region_id, 
      notes = null, 
      admin_notes = null, 
      status = 'draft',
      parameters = []
    } = reportData;
    
    const id = uuidv4();
    
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Rapor ekle
      const reportQuery = `
        INSERT INTO water_quality_reports 
        (id, title, station_id, user_id, region_id, notes, admin_notes, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      await connection.execute(
        reportQuery, 
        [id, title, station_id, user_id, region_id, notes, admin_notes, status]
      );
      
      // Parametreleri ekle
      if (parameters.length > 0) {
        const parameterPromises = parameters.map(param => {
          const parameterId = uuidv4();
          const paramQuery = `
            INSERT INTO report_parameters
            (id, report_id, parameter_name, value, unit, status)
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          
          return connection.execute(
            paramQuery,
            [parameterId, id, param.name, param.value, param.unit, param.status]
          );
        });
        
        await Promise.all(parameterPromises);
      }
      
      await connection.commit();
      
      return { id, title, station_id, user_id, region_id, status };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
  
  // Tüm raporları getir
  static async findAll(filters = {}) {
    let query = `
      SELECT r.*, s.name as station_name, reg.name as region_name, u.name as user_name
      FROM water_quality_reports r
      JOIN stations s ON r.station_id = s.id
      JOIN regions reg ON r.region_id = reg.id
      JOIN users u ON r.user_id = u.id
    `;
    
    const params = [];
    const conditions = [];
    
    if (filters.region_id) {
      conditions.push('r.region_id = ?');
      params.push(filters.region_id);
    }
    
    if (filters.user_id) {
      conditions.push('r.user_id = ?');
      params.push(filters.user_id);
    }
    
    if (filters.status) {
      conditions.push('r.status = ?');
      params.push(filters.status);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY r.created_at DESC';
    
    try {
      const [rows] = await pool.execute(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  }
  
  // ID ile rapor bul
  static async findById(id) {
    const reportQuery = `
      SELECT r.*, s.name as station_name, reg.name as region_name, u.name as user_name
      FROM water_quality_reports r
      JOIN stations s ON r.station_id = s.id
      JOIN regions reg ON r.region_id = reg.id
      JOIN users u ON r.user_id = u.id
      WHERE r.id = ?
    `;
    
    const parametersQuery = `
      SELECT * FROM report_parameters
      WHERE report_id = ?
    `;
    
    const imagesQuery = `
      SELECT * FROM report_images
      WHERE report_id = ?
    `;
    
    try {
      const [reportRows] = await pool.execute(reportQuery, [id]);
      
      if (reportRows.length === 0) {
        return null;
      }
      
      const [parameterRows] = await pool.execute(parametersQuery, [id]);
      const [imageRows] = await pool.execute(imagesQuery, [id]);
      
      const report = reportRows[0];
      report.parameters = parameterRows;
      report.images = imageRows;
      
      return report;
    } catch (error) {
      throw error;
    }
  }
  
  // Rapor güncelle
  static async update(id, reportData) {
    const { 
      title, 
      notes, 
      admin_notes, 
      status,
      parameters = []
    } = reportData;
    
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Rapor güncelle
      const reportQuery = `
        UPDATE water_quality_reports
        SET title = ?, notes = ?, admin_notes = ?, status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      
      const [reportResult] = await connection.execute(
        reportQuery, 
        [title, notes, admin_notes, status, id]
      );
      
      if (reportResult.affectedRows === 0) {
        throw new Error('Rapor bulunamadı');
      }
      
      // Parametreleri güncelle
      if (parameters.length > 0) {
        // Önce mevcut parametreleri sil
        await connection.execute(
          'DELETE FROM report_parameters WHERE report_id = ?', 
          [id]
        );
        
        // Yeni parametreleri ekle
        const parameterPromises = parameters.map(param => {
          const parameterId = uuidv4();
          const paramQuery = `
            INSERT INTO report_parameters
            (id, report_id, parameter_name, value, unit, status)
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          
          return connection.execute(
            paramQuery,
            [parameterId, id, param.name, param.value, param.unit, param.status]
          );
        });
        
        await Promise.all(parameterPromises);
      }
      
      await connection.commit();
      
      return { id, title, status };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
  
  // Rapor sil
  static async delete(id) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Önce parametreleri sil
      await connection.execute(
        'DELETE FROM report_parameters WHERE report_id = ?', 
        [id]
      );
      
      // Resimleri sil
      await connection.execute(
        'DELETE FROM report_images WHERE report_id = ?', 
        [id]
      );
      
      // Raporu sil
      const [reportResult] = await connection.execute(
        'DELETE FROM water_quality_reports WHERE id = ?', 
        [id]
      );
      
      if (reportResult.affectedRows === 0) {
        throw new Error('Rapor bulunamadı');
      }
      
      await connection.commit();
      
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
  
  // Parametre ekle
  static async addParameter(reportId, parameterData) {
    const { name, value, unit, status } = parameterData;
    const id = uuidv4();
    
    const query = `
      INSERT INTO report_parameters
      (id, report_id, parameter_name, value, unit, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    try {
      await pool.execute(query, [id, reportId, name, value, unit, status]);
      return { id, report_id: reportId, parameter_name: name, value, unit, status };
    } catch (error) {
      throw error;
    }
  }
  
  // Resim ekle
  static async addImage(reportId, imageUrl) {
    const id = uuidv4();
    
    const query = `
      INSERT INTO report_images
      (id, report_id, image_url)
      VALUES (?, ?, ?)
    `;
    
    try {
      await pool.execute(query, [id, reportId, imageUrl]);
      return { id, report_id: reportId, image_url: imageUrl };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = WaterQualityReport; 