export const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.warn("Brak konfiguracji VITE_API_URL w pliku .env");
}