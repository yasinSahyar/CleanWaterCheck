const { pool } = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

class User {
  // Kullanıcı oluştur
  static async create(userData) {
    const { email, name, region, password, role = 'customer' } = userData;
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = `
      INSERT INTO users (id, email, name, region, role, password_hash)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    try {
      const [result] = await pool.execute(query, [id, email, name, region, role, hashedPassword]);
      return { id, email, name, region, role };
    } catch (error) {
      throw error;
    }
  }
  
  // Email ile kullanıcı bul
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    
    try {
      const [rows] = await pool.execute(query, [email]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }
  
  // ID ile kullanıcı bul
  static async findById(id) {
    const query = 'SELECT id, email, name, region, role, created_at, updated_at FROM users WHERE id = ?';
    
    try {
      const [rows] = await pool.execute(query, [id]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }
  
  // Tüm kullanıcıları getir
  static async findAll() {
    const query = 'SELECT id, email, name, region, role, created_at, updated_at FROM users';
    
    try {
      const [rows] = await pool.execute(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }
  
  // Kullanıcı güncelle
  static async update(id, userData) {
    const { name, region, role } = userData;
    
    const query = `
      UPDATE users
      SET name = ?, region = ?, role = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    try {
      const [result] = await pool.execute(query, [name, region, role, id]);
      if (result.affectedRows === 0) {
        throw new Error('Kullanıcı bulunamadı');
      }
      return { id, name, region, role };
    } catch (error) {
      throw error;
    }
  }
  
  // Şifre güncelle
  static async updatePassword(id, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = `
      UPDATE users
      SET password_hash = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    try {
      const [result] = await pool.execute(query, [hashedPassword, id]);
      if (result.affectedRows === 0) {
        throw new Error('Kullanıcı bulunamadı');
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
  
  // Kullanıcı sil
  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = ?';
    
    try {
      const [result] = await pool.execute(query, [id]);
      if (result.affectedRows === 0) {
        throw new Error('Kullanıcı bulunamadı');
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
  
  // Şifre doğrulama
  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User; 