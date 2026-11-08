const express = require('express');
const router = express.Router();

const {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movieController');

// GET – lista wszystkich filmów
router.get('/', getMovies);

// GET – szczegóły konkretnego filmu
router.get('/:id', getMovieById);

router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;