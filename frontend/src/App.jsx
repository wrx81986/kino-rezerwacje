
import './App.css'
import { useEffect, useState } from 'react'
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie
} from './services/movieService'

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    duration: '',
    rating: ''
  });

  // Pobieranie filmów
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  // Dodawanie i edycja filmu
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setSuccess('');

    const movie = {
      title: formData.title.trim(),
      genre: formData.genre.trim(),
      duration: Number(formData.duration),
      rating: Number(formData.rating)
    };

    if (!movie.title || !movie.genre) {
      setError('Tytuł i gatunek są wymagane.');
      return;
    }

    if (!Number.isInteger(movie.duration) || movie.duration <= 0) {
      setError('Czas trwania musi być dodatnią liczbą całkowitą.');
      return;
    }

    if (
      formData.rating === '' ||
      !Number.isFinite(movie.rating) ||
      movie.rating < 0 ||
      movie.rating > 10
    ) {
      setError('Ocena musi być liczbą od 0 do 10.');
      return;
    }

    try {
      if (editingId !== null) {
        await updateMovie(editingId, movie);
        setSuccess('Film został zaktualizowany.');
      } else {
        await createMovie(movie);
        setSuccess('Film został dodany.');
      }

      const updatedMovies = await getMovies();
      setMovies(updatedMovies);

      setFormData({
        title: '',
        genre: '',
        duration: '',
        rating: ''
      });

      setEditingId(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Wczytywanie filmu do edycji
  const handleEdit = (movie) => {
    setEditingId(movie.id);

    setFormData({
      title: movie.title,
      genre: movie.genre,
      duration: String(movie.duration),
      rating: String(movie.rating)
    });

    setError('');
    setSuccess('');
  };

  // Usuwanie filmu
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Czy na pewno chcesz usunąć ten film?'
    );

    if (!confirmed) return;

    try {
      setError('');
      setSuccess('');

      await deleteMovie(id);

      const updatedMovies = await getMovies();
      setMovies(updatedMovies);

      setSuccess('Film został usunięty.');

      if (editingId === id) {
        setEditingId(null);

        setFormData({
          title: '',
          genre: '',
          duration: '',
          rating: ''
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Anulowanie edycji
  const handleCancelEdit = () => {
    setEditingId(null);

    setFormData({
      title: '',
      genre: '',
      duration: '',
      rating: ''
    });

    setError('');
    setSuccess('');
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">CINEMA<span>.</span></div>

        <nav>
          <a href="#movies">Filmy</a>
          <a href="#about">O kinie</a>
        </nav>

        <button className="login-button">Zaloguj się</button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">TWOJE KINO ONLINE</p>

            <h1>
              Wielkie historie.<br />
              <span>Wielkie emocje.</span>
            </h1>

            <p className="hero-description">
              Odkryj najciekawsze filmy i zarezerwuj swoje ulubione miejsce na sali.
            </p>

            <a className="hero-button" href="#movies">
              Odkryj repertuar ↓
            </a>
          </div>
        </section>

        <section className="movies-section" id="movies">
          <div className="section-heading">
            <div>
              <p className="eyebrow">AKTUALNY REPERTUAR</p>
              <h2>Na dużym ekranie</h2>
            </div>

            <span className="movie-count">
              {movies.length} FILMY
            </span>
          </div>

          {/* Komunikaty */}
          {loading && <p>Ładowanie filmów...</p>}

          {error && (
            <p className="app-message error" role="alert">
              {error}
            </p>
          )}

          {success && (
            <p className="app-message success" role="status">
              {success}
            </p>
          )}

          {/* Formularz dodawania i edycji */}
          <div className="movie-form">
            <h3>
              {editingId !== null ? 'Edytuj film' : 'Dodaj nowy film'}
            </h3>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Tytuł filmu"
                value={formData.title}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    title: event.target.value
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Gatunek"
                value={formData.genre}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    genre: event.target.value
                  })
                }
                required
              />

              <input
                type="number"
                placeholder="Czas trwania (minuty)"
                value={formData.duration}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    duration: event.target.value
                  })
                }
                min="1"
                step="1"
                required
              />

              <input
                type="number"
                placeholder="Ocena (0-10)"
                value={formData.rating}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    rating: event.target.value
                  })
                }
                min="0"
                max="10"
                step="0.1"
                required
              />

              <button type="submit">
                {editingId !== null ? 'Zapisz zmiany' : 'Dodaj film'}
              </button>

              {editingId !== null && (
                <button type="button" onClick={handleCancelEdit}>
                  Anuluj edycję
                </button>
              )}
            </form>
          </div>

          {/* Lista filmów */}
          {!loading && movies.length === 0 && (
            <p>Brak filmów w repertuarze.</p>
          )}

          <div className="movies-grid">
            {movies.map((movie) => (
              <article className="movie-card" key={movie.id}>
                <div className="poster-container">
                  <div className="poster-placeholder">
                    <span>CINEMA</span>
                    <strong>{movie.title}</strong>
                  </div>

                  <span className="rating">
                    ★ {movie.rating}
                  </span>
                </div>

                <div className="movie-info">
                  <p className="movie-genre">{movie.genre}</p>

                  <h3>{movie.title}</h3>

                  <p className="movie-description">
                    {movie.description}
                  </p>

                  <div className="movie-footer">
                    <span>{movie.duration} min</span>

                    <button onClick={() => handleEdit(movie)}>
                      Edytuj
                    </button>

                    <button onClick={() => handleDelete(movie.id)}>
                      Usuń
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="about">
        <span>
          CINEMA<span className="footer-dot">.</span>
        </span>

        <p>
          © 2026 Cinema Reservations. System rezerwacji miejsc kinowych.
        </p>
      </footer>
    </div>
  )
}

export default App
