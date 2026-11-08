import { API_URL } from '../config/api';

// Pobieranie wszystkich filmów
export const getMovies = async () => {
  const response = await fetch(`${API_URL}/movies`);

  if (!response.ok) {
    throw new Error('Nie udało się pobrać filmów');
  }

  return response.json();
};

// Dodawanie filmu
export const createMovie = async (movie) => {
  const response = await fetch(`${API_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    throw new Error('Nie udało się dodać filmu');
  }

  return response.json();
};

// Edycja filmu
export const updateMovie = async (id, movie) => {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    throw new Error('Nie udało się zaktualizować filmu');
  }

  return response.json();
};

// Usuwanie filmu
export const deleteMovie = async (id) => {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Nie udało się usunąć filmu');
  }

  return response.json();
};