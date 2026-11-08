const pool = require('../db');

// GET — pobieranie wszystkich filmów
const getMovies = async (req, res, next) => {
    try {
        const result = await pool.query(
            'SELECT * FROM movies ORDER BY id'
        );

        res.status(200).json(result.rows);
    } catch (error) {
        next(error);
    }
};

// GET — pobieranie filmu po ID
const getMovieById = async (req, res, next) => {
    try {
        const movieId = Number(req.params.id);

        if (!Number.isInteger(movieId) || movieId <= 0) {
            return res.status(400).json({
                error: 'Nieprawidłowe ID filmu'
            });
        }

        const result = await pool.query(
            'SELECT * FROM movies WHERE id = $1',
            [movieId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Nie znaleziono filmu'
            });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// POST — dodawanie filmu
const createMovie = async (req, res, next) => {
    try {
        const { title, genre, duration, rating } = req.body;

        if (
            typeof title !== 'string' || !title.trim() ||
            typeof genre !== 'string' || !genre.trim() ||
            !Number.isInteger(duration) || duration <= 0 ||
            typeof rating !== 'number' || rating < 0 || rating > 10
        ) {
            return res.status(400).json({
                error: 'Nieprawidłowe dane filmu'
            });
        }

        const result = await pool.query(
            `INSERT INTO movies (id, title, genre, duration, rating)
             VALUES (
                 (SELECT COALESCE(MAX(id), 0) + 1 FROM movies),
                 $1, $2, $3, $4
             )
             RETURNING *`,
            [title.trim(), genre.trim(), duration, rating]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// PUT — aktualizacja filmu
const updateMovie = async (req, res, next) => {
    try {
        const movieId = Number(req.params.id);
        const { title, genre, duration, rating } = req.body;

        if (!Number.isInteger(movieId) || movieId <= 0) {
            return res.status(400).json({
                error: 'Nieprawidłowe ID filmu'
            });
        }

        if (
            typeof title !== 'string' || !title.trim() ||
            typeof genre !== 'string' || !genre.trim() ||
            !Number.isInteger(duration) || duration <= 0 ||
            typeof rating !== 'number' || rating < 0 || rating > 10
        ) {
            return res.status(400).json({
                error: 'Nieprawidłowe dane filmu'
            });
        }

        const result = await pool.query(
            `UPDATE movies
             SET title = $1, genre = $2, duration = $3, rating = $4
             WHERE id = $5
             RETURNING *`,
            [title.trim(), genre.trim(), duration, rating, movieId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Nie znaleziono filmu'
            });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// DELETE — usuwanie filmu
const deleteMovie = async (req, res, next) => {
    try {
        const movieId = Number(req.params.id);

        if (!Number.isInteger(movieId) || movieId <= 0) {
            return res.status(400).json({
                error: 'Nieprawidłowe ID filmu'
            });
        }

        const result = await pool.query(
            'DELETE FROM movies WHERE id = $1 RETURNING *',
            [movieId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Nie znaleziono filmu'
            });
        }

        res.status(200).json({
            message: 'Film został usunięty',
            movie: result.rows[0]
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};