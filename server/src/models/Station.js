const { pool } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class Station {
  // İstasyon oluştur
  static async create(stationData) {
    const { 
      name, 
      region_id, 
      latitude, 
      longitude, 
      type = 'municipal', 
      status = 'active' 
    } = stationData;
    
    const id = uuidv4();
    
    const query = `
      INSERT INTO stations
      (id, name, region_id, latitude, longitude, type, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    try {
      await pool.execute(query, [id, name, region_id, latitude, longitude, type, status]);
      return { id, name, region_id, latitude, longitude, type, status };
    } catch (error) {
      throw error;
    }
  }
  
  // Tüm istasyonları getir
  static async findAll(filters = {}) {
    let query = `
      SELECT s.*, r.name as region_name
      FROM stations s
      JOIN regions r ON s.region_id = r.id
    `;
    
    const params = [];
    const conditions = [];
    
    if (filters.region_id) {
      conditions.push('s.region_id = ?');
      params.push(filters.region_id);
    }
    
    if (filters.status) {
      conditions.push('s.status = ?');
      params.push(filters.status);
    }
    
    if (filters.type) {
      conditions.push('s.type = ?');
      params.push(filters.type);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY s.name ASC';
    
    try {
      const [rows] = await pool.execute(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  }
  
  // ID ile istasyon bul
  static async findById(id) {
    const query = `
      SELECT s.*, r.name as region_name
      FROM stations s
      JOIN regions r ON s.region_id = r.id
      WHERE s.id = ?
    `;
    
    try {
      const [rows] = await pool.execute(query, [id]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }
  
  // İstasyon güncelle
  static async update(id, stationData) {
    const { name, region_id, latitude, longitude, type, status } = stationData;
    
    const query = `
      UPDATE stations
      SET name = ?, region_id = ?, latitude = ?, longitude = ?, type = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    try {
      const [result] = await pool.execute(
        query, 
        [name, region_id, latitude, longitude, type, status, id]
      );
      
      if (result.affectedRows === 0) {
        throw new Error('İstasyon bulunamadı');
      }
      
      return { id, name, region_id, latitude, longitude, type, status };
    } catch (error) {
      throw error;
    }
  }
  
  // İstasyon sil
  static async delete(id) {
    const query = 'DELETE FROM stations WHERE id = ?';
    
    try {
      const [result] = await pool.execute(query, [id]);
      
      if (result.affectedRows === 0) {
        throw new Error('İstasyon bulunamadı');
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }
  
  // Bölgeye göre istasyonları getir
  static async findByRegion(regionId) {
    const query = `
      SELECT s.*, r.name as region_name
      FROM stations s
      JOIN regions r ON s.region_id = r.id
      WHERE s.region_id = ?
      ORDER BY s.name ASC
    `;
    
    try {
      const [rows] = await pool.execute(query, [regionId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Station; 