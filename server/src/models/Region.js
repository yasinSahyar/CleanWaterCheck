const { pool } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class Region {
  // Bölge oluştur
  static async create(regionData) {
    const { name, code, population } = regionData;
    const id = uuidv4();
    
    const query = `
      INSERT INTO regions
      (id, name, code, population)
      VALUES (?, ?, ?, ?)
    `;
    
    try {
      await pool.execute(query, [id, name, code, population]);
      return { id, name, code, population };
    } catch (error) {
      throw error;
    }
  }
  
  // Tüm bölgeleri getir
  static async findAll() {
    const query = 'SELECT * FROM regions ORDER BY name ASC';
    
    try {
      const [rows] = await pool.execute(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }
  
  // ID ile bölge bul
  static async findById(id) {
    const regionQuery = 'SELECT * FROM regions WHERE id = ?';
    const waterSourcesQuery = 'SELECT * FROM water_sources WHERE region_id = ?';
    const waterUtilitiesQuery = 'SELECT * FROM water_utilities WHERE region_id = ?';
    
    try {
      const [regionRows] = await pool.execute(regionQuery, [id]);
      
      if (regionRows.length === 0) {
        return null;
      }
      
      const [waterSourceRows] = await pool.execute(waterSourcesQuery, [id]);
      const [waterUtilityRows] = await pool.execute(waterUtilitiesQuery, [id]);
      
      const region = regionRows[0];
      region.waterSources = waterSourceRows;
      region.waterUtilities = waterUtilityRows;
      
      return region;
    } catch (error) {
      throw error;
    }
  }
  
  // Kod ile bölge bul
  static async findByCode(code) {
    const query = 'SELECT * FROM regions WHERE code = ?';
    
    try {
      const [rows] = await pool.execute(query, [code]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }
  
  // Bölge güncelle
  static async update(id, regionData) {
    const { name, code, population, water_quality_index, compliance_rate, treatment_efficiency } = regionData;
    
    const query = `
      UPDATE regions
      SET name = ?, code = ?, population = ?, 
          water_quality_index = ?, compliance_rate = ?, treatment_efficiency = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    try {
      const [result] = await pool.execute(
        query, 
        [name, code, population, water_quality_index, compliance_rate, treatment_efficiency, id]
      );
      
      if (result.affectedRows === 0) {
        throw new Error('Bölge bulunamadı');
      }
      
      return { id, name, code, population, water_quality_index, compliance_rate, treatment_efficiency };
    } catch (error) {
      throw error;
    }
  }
  
  // Bölge sil
  static async delete(id) {
    const query = 'DELETE FROM regions WHERE id = ?';
    
    try {
      const [result] = await pool.execute(query, [id]);
      
      if (result.affectedRows === 0) {
        throw new Error('Bölge bulunamadı');
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }
  
  // Su kaynağı ekle
  static async addWaterSource(regionId, sourceData) {
    const { name, type, latitude, longitude } = sourceData;
    const id = uuidv4();
    
    const query = `
      INSERT INTO water_sources
      (id, region_id, name, type, latitude, longitude)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    try {
      await pool.execute(query, [id, regionId, name, type, latitude, longitude]);
      return { id, region_id: regionId, name, type, latitude, longitude };
    } catch (error) {
      throw error;
    }
  }
  
  // Su tesisi ekle
  static async addWaterUtility(regionId, utilityData) {
    const { name, type, population_served, treatment_capacity } = utilityData;
    const id = uuidv4();
    
    const query = `
      INSERT INTO water_utilities
      (id, region_id, name, type, population_served, treatment_capacity)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    try {
      await pool.execute(query, [id, regionId, name, type, population_served, treatment_capacity]);
      return { id, region_id: regionId, name, type, population_served, treatment_capacity };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Region; 