
import './App.css'
import movies from './data/movies.json'

function App() {
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
            <h1>Wielkie historie.<br /><span>Wielkie emocje.</span></h1>
            <p className="hero-description">
              Odkryj najciekawsze filmy i zarezerwuj swoje ulubione miejsce na sali.
            </p>
            <a className="hero-button" href="#movies">Odkryj repertuar ↓</a>
          </div>
        </section>

        <section className="movies-section" id="movies">
          <div className="section-heading">
            <div>
              <p className="eyebrow">AKTUALNY REPERTUAR</p>
              <h2>Na dużym ekranie</h2>
            </div>
            <span className="movie-count">{movies.length} FILMY</span>
          </div>

          <div className="movies-grid">
            {movies.map((movie) => (
              <article className="movie-card" key={movie.id}>
                <div className="poster-container">
                  <img src={movie.image} alt={`Plakat filmu ${movie.title}`} />
                  <span className="rating">★ {movie.rating}</span>
                </div>
                <div className="movie-info">
                  <p className="movie-genre">{movie.genre}</p>
                  <h3>{movie.title}</h3>
                  <p className="movie-description">{movie.description}</p>
                  <div className="movie-footer">
                    <span>{movie.duration}</span>
                    <button onClick={() => alert(`Wybrano film: ${movie.title}`)}>
                      Zobacz seanse →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="about">
        <span>CINEMA<span className="footer-dot">.</span></span>
        <p>© 2026 Cinema Reservations. System rezerwacji miejsc kinowych.</p>
      </footer>
    </div>
  )
}

export default App
