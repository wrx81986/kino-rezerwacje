require('dotenv').config();

const pool = require('./db');

async function checkMovies() {
    try {
        const result = await pool.query(
            'SELECT * FROM movies ORDER BY id'
        );

        console.log('Filmy zapisane w PostgreSQL:');
        console.table(result.rows);
    } catch (error) {
        console.error('Błąd odczytu:', error.message);
    } finally {
        await pool.end();
    }
}

checkMovies();