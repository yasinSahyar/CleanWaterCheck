const { pool } = require('./src/config/db');

async function insertCity() {
  try {
    const [rows] = await pool.query(
      "INSERT INTO cities (postal_code, city_name) VALUES (?, ?)",
      ['00750', 'Oulu']
    );
    console.log('Şehir başarıyla eklendi:', rows);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log('Bu posta kodu zaten mevcut.');
    } else {
      console.error('Hata:', error);
    }
  } finally {
    pool.end();
  }
}

insertCity(); 