# System rezerwacji miejsc w kinie

## 1. Opis projektu

Projekt przedstawia aplikację internetową umożliwiającą zarządzanie repertuarem kina oraz docelowo rezerwację miejsc na wybrane seanse. Użytkownik może przeglądać dostępne filmy, a administrator może zarządzać ich danymi.

Aplikacja jest rozwijana z wykorzystaniem architektury trójwarstwowej oraz usług chmurowych Google Cloud.

## 2. Cel projektu

Celem projektu jest stworzenie systemu umożliwiającego wygodne zarządzanie repertuarem i rezerwacjami miejsc kinowych z wykorzystaniem nowoczesnych technologii webowych, REST API oraz relacyjnej bazy danych w chmurze.

## 3. Funkcjonalności aplikacji

### Zaimplementowane funkcjonalności

- Wyświetlanie listy filmów.
- Pobieranie danych z bazy PostgreSQL przez REST API.
- Dodawanie nowych filmów.
- Edytowanie danych istniejących filmów.
- Usuwanie filmów.
- Walidacja danych po stronie front-endu i back-endu.
- Obsługa komunikatów błędów i potwierdzeń operacji.
- Przechowywanie danych w Google Cloud SQL.

### Planowane funkcjonalności

- Rejestracja i logowanie użytkowników.
- Przeglądanie seansów.
- Wyświetlanie szczegółów filmu i seansu.
- Interaktywny wybór miejsc na sali kinowej.
- Tworzenie i wyświetlanie rezerwacji.
- Zmiana zarezerwowanego miejsca.
- Anulowanie rezerwacji.
- Blokada zmiany miejsca na 30 minut przed rozpoczęciem seansu.

## 4. Wykorzystane technologie

| Element | Technologia |
|---|---|
| Front-end | React, Vite |
| Back-end | Node.js, Express |
| Komunikacja | REST API, HTTP, JSON |
| Baza danych | PostgreSQL |
| Usługa bazodanowa | Google Cloud SQL |
| Połączenie z bazą | Cloud SQL Auth Proxy |
| Infrastruktura | Google Cloud, VPC, Terraform |
| Kontrola wersji | Git, GitHub |

## 5. Architektura systemu

Aplikacja wykorzystuje architekturę trójwarstwową:

1. **Warstwa prezentacji** – React odpowiada za interfejs użytkownika.
2. **Warstwa aplikacyjna** – Node.js i Express obsługują logikę aplikacji oraz REST API.
3. **Warstwa danych** – PostgreSQL przechowuje informacje o filmach.

Komunikacja pomiędzy front-endem i back-endem odbywa się za pomocą protokołu HTTP. Dane są przesyłane w formacie JSON.

Back-end komunikuje się z bazą danych PostgreSQL przy użyciu biblioteki `pg`. Baza danych działa w usłudze Google Cloud SQL.

## 6. Struktura projektu

```text
kino-rezerwacje/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── data/
│   ├── db.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── config/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── config/
├── docs/
├── .gitignore
└── README.md
```

## 7. Dokumentacja REST API

Adres lokalnego API:

`http://localhost:3000/api`

| Metoda | Endpoint | Opis | Odpowiedź |
|---|---|---|---|
| GET | `/movies` | Pobieranie listy filmów | 200 |
| GET | `/movies/:id` | Pobieranie filmu o podanym ID | 200 / 404 |
| POST | `/movies` | Dodawanie filmu | 201 / 400 |
| PUT | `/movies/:id` | Aktualizacja danych filmu | 200 / 400 / 404 |
| DELETE | `/movies/:id` | Usuwanie filmu | 200 / 404 |

### Przykładowe dane filmu

```json
{
  "title": "Interstellar",
  "genre": "Sci-Fi / Dramat",
  "duration": 169,
  "rating": 8.7
}
```

### Walidacja danych

API sprawdza:

- Czy tytuł i gatunek zostały podane.
- Czy czas trwania jest dodatnią liczbą całkowitą.
- Czy ocena jest liczbą z zakresu od 0 do 10.
- Czy film o podanym identyfikatorze istnieje.

W przypadku nieprawidłowych danych API zwraca odpowiedź 400. Jeśli film nie istnieje, zwracany jest kod 404. Błędy serwera obsługiwane są kodem 500.

## 8. Uruchomienie lokalne

### Wymagania

- Node.js
- npm
- Git
- Dostęp do instancji Google Cloud SQL
- Cloud SQL Auth Proxy

### Krok 1. Pobranie projektu

```bash
git clone https://github.com/wrx81986/kino-rezerwacje.git
cd kino-rezerwacje
```

### Krok 2. Instalacja zależności

W katalogu `backend`:

```bash
npm install
```

W katalogu `frontend`:

```bash
npm install
```

### Krok 3. Konfiguracja zmiennych środowiskowych

W katalogu `backend` należy utworzyć plik `.env` na podstawie `.env.example`.

Przykładowa konfiguracja:

```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=kino_db
DB_USER=kino_app
DB_PASSWORD=twoje_haslo
```

W katalogu `frontend` należy utworzyć plik `.env.local`:

```env
VITE_API_URL=http://localhost:3000/api
```

Należy uzupełnić dane dostępowe do własnej instancji bazy danych. Poufne dane nie mogą być umieszczane w repozytorium GitHub.

### Krok 4. Uruchomienie Cloud SQL Auth Proxy

W katalogu `backend`:

```powershell
.\cloud-sql-proxy.exe kino-rezerwacje:europe-central2:kino-postgres
```

Proxy umożliwia lokalnemu back-endowi połączenie z bazą danych Google Cloud SQL.

### Krok 5. Uruchomienie back-endu

W osobnym terminalu, w katalogu `backend`:

```bash
npm start
```

Serwer API będzie dostępny pod adresem:

`http://localhost:3000`

### Krok 6. Uruchomienie front-endu

W osobnym terminalu, w katalogu `frontend`:

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem:

`http://localhost:5173`

## 9. Zmienne środowiskowe i bezpieczeństwo

Konfiguracja aplikacji jest przechowywana w zmiennych środowiskowych.

Wykorzystywane zmienne:

- `VITE_API_URL` – adres REST API.
- `DB_HOST` – adres serwera bazy danych.
- `DB_PORT` – port PostgreSQL.
- `DB_NAME` – nazwa bazy danych.
- `DB_USER` – użytkownik bazy danych.
- `DB_PASSWORD` – hasło użytkownika bazy danych.

Pliki zawierające poufne dane są wykluczone z repozytorium za pomocą `.gitignore`.

## 10. Infrastruktura i wdrożenie

Projekt wykorzystuje usługi Google Cloud:

- Google Cloud SQL – zarządzana instancja PostgreSQL.
- Google Cloud VPC – prywatna sieć wirtualna.
- Cloud SQL Auth Proxy – bezpieczne połączenie lokalnego środowiska z bazą danych.
- Terraform – konfiguracja i zarządzanie infrastrukturą jako kodem.

Docelowe wdrożenie aplikacji wymaga przygotowania środowiska uruchomieniowego dla front-endu i back-endu.

## 11. Kontrola wersji

Kod źródłowy projektu jest przechowywany w repozytorium GitHub:

https://github.com/wrx81986/kino-rezerwacje

Główną gałęzią projektu jest `main`.

Zmiany w kodzie są zapisywane za pomocą commitów i przesyłane do zdalnego repozytorium.

## 12. Autor projektu

Projekt indywidualny realizowany w ramach przedmiotu Projekt Zespołowy.