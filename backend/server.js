
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const movieRoutes = require('./routes/movieRoutes');

// Obsługa komunikacji z frontendem
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Obsługa danych JSON
app.use(express.json());

// Główny adres API filmów
app.use('/api/movies', movieRoutes);

// Test serwera
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Cinema API działa poprawnie!'
    });
});

// Obsługa nieznanych adresów
app.use((req, res) => {
    res.status(404).json({
        error: 'Nie znaleziono takiego adresu API'
    });
});

// Centralna obsługa błędów serwera
app.use((err, req, res, next) => {
    console.error(err);

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            error: 'Nieprawidłowy format JSON'
        });
    }

    res.status(500).json({
        error: 'Wewnętrzny błąd serwera'
    });
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
