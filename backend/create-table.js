
require('dotenv').config();

const pool = require('./db');

async function createTable() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS movies (
                id INTEGER PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                genre VARCHAR(100) NOT NULL,
                duration INTEGER NOT NULL CHECK (duration > 0),
                rating NUMERIC(3,1) NOT NULL CHECK (rating >= 0 AND rating <= 10)
            );
        `);

        console.log('Tabela movies została utworzona!');
    } catch (error) {
        console.error('Błąd tworzenia tabeli:', error.message);
    } finally {
        await pool.end();
    }
}

createTable();
