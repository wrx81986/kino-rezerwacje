require('dotenv').config();

const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function importMovies() {
    try {
        const filePath = path.join(__dirname, 'data', 'movies.json');
        const movies = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        for (const movie of movies) {
            await pool.query(
                `INSERT INTO movies (id, title, genre, duration, rating)
                 VALUES ($1, $2, $3, $4, $5)
                 ON CONFLICT (id) DO NOTHING`,
                [
                    movie.id,
                    movie.title,
                    movie.genre,
                    movie.duration,
                    movie.rating
                ]
            );
        }

        console.log(`Import zakończony. Liczba filmów w pliku: ${movies.length}`);
    } catch (error) {
        console.error('Błąd importu filmów:', error.message);
    } finally {
        await pool.end();
    }
}

importMovies();