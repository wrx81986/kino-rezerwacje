
require('dotenv').config();

const pool = require('./db');

async function testConnection() {
    try {
        const result = await pool.query('SELECT NOW()');

        console.log('Połączenie z PostgreSQL działa!');
        console.log('Czas serwera:', result.rows[0].now);
    } catch (error) {
        console.error('Błąd połączenia:', error.message);
    } finally {
        await pool.end();
    }
}

testConnection();
