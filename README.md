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

## 12. Igor Jarczewski

Projekt indywidualny realizowany w ramach przedmiotu Projekt Zespołowy.


## 13. Bezpieczeństwo infrastruktury i reguły dostępu

Projekt wykorzystuje zarządzane usługi Google Cloud i Firebase. Kontrola dostępu do poszczególnych warstw odbywa się za pomocą konfiguracji sieciowej VPC, ustawień usług oraz uprawnień IAM.

### 13.1. Warstwa prezentacji – Firebase Hosting

| Kierunek | Port | Źródło / cel | Zasada |
|---|---:|---|---|
| Inbound | TCP 443 | Internet | Publiczny dostęp do aplikacji przez HTTPS |
| Inbound | TCP 80 | Internet | Przekierowanie HTTP na HTTPS |
| Outbound | TCP 443 | Przeglądarka użytkownika → Cloud Run | Komunikacja z REST API przez HTTPS |

Firebase Hosting jest usługą zarządzaną. Reguły ruchu są obsługiwane przez platformę, bez konieczności konfigurowania własnej maszyny wirtualnej ani grupy reguł firewall.

### 13.2. Warstwa aplikacyjna – Cloud Run

| Kierunek | Port | Źródło / cel | Zasada |
|---|---:|---|---|
| Inbound | TCP 443 | Internet | Publiczny dostęp do REST API przez HTTPS |
| Inbound | TCP 80 | Internet | Przekierowanie HTTP na HTTPS |
| Inbound | TCP 22 | — | Brak dostępu SSH – usługa zarządzana |
| Inbound | TCP 3389 | — | Brak dostępu RDP – usługa zarządzana |
| Outbound | TCP 5432 | Cloud SQL – prywatny adres IP 172.28.18.3 | Połączenie z PostgreSQL przez prywatną sieć VPC |

Usługa Cloud Run korzysta z sieci `kino-vpc` i podsieci `kino-app-subnet`. Ruch do prywatnych zakresów adresowych jest kierowany przez VPC.

Backend posiada publiczny punkt dostępu, ponieważ frontend Firebase komunikuje się z REST API bezpośrednio z przeglądarki. Dostęp do wywoływania usługi jest obecnie przyznany przez rolę IAM `roles/run.invoker` dla `allUsers`. Jest to świadoma konfiguracja obecnej architektury, a nie ograniczenie dostępu wyłącznie do Firebase Hosting.

Usługa korzysta z dedykowanego konta `kino-backend-runtime`, któremu przyznano rolę `roles/cloudsql.client` niezbędną do komunikacji z bazą danych.

### 13.3. Warstwa danych – Google Cloud SQL

| Kierunek | Port | Źródło / cel | Zasada |
|---|---:|---|---|
| Inbound | TCP 5432 | Backend Cloud Run przez prywatną sieć VPC | Dostęp do PostgreSQL przez prywatny adres IP |
| Inbound | TCP 5432 | Publiczny Internet (`0.0.0.0/0`) | Brak dostępu – publiczny adres IP wyłączony |
| Inbound | TCP 3306 | — | Nie dotyczy – projekt korzysta z PostgreSQL |
| Outbound | — | — | Brak skonfigurowanego publicznego dostępu wychodzącego z bazy |

Instancja Cloud SQL `kino-postgres` nie posiada publicznego adresu IP. Dostęp do bazy odbywa się przez prywatny adres `172.28.18.3` w sieci `kino-vpc`.

Nie skonfigurowano publicznych dozwolonych adresów IP (`authorizedNetworks`). Połączenia z bazą wymagają szyfrowania – ustawienie `sslMode` ma wartość `ENCRYPTED_ONLY`.

### 13.4. Podsumowanie zabezpieczeń

- Baza PostgreSQL jest niedostępna bezpośrednio z publicznego Internetu.
- Komunikacja z aplikacją i API odbywa się przez HTTPS.
- Żądania HTTP są przekierowywane na HTTPS.
- Cloud Run nie udostępnia portów administracyjnych SSH (22) ani RDP (3389).
- Backend korzysta z dedykowanego konta usługi z ograniczonymi uprawnieniami.
- Dostęp do Cloud SQL odbywa się przez prywatną sieć VPC.
- Usługi Firebase Hosting, Cloud Run i Cloud SQL korzystają z zarządzanych mechanizmów bezpieczeństwa Google Cloud.

**Uwaga architektoniczna:** backend jest publicznie dostępny, ponieważ aplikacja frontendowa wywołuje jego API bezpośrednio. Ograniczenie dostępu wyłącznie do warstwy prezentacji wymagałoby zmiany architektury, np. zastosowania pośredniczącego backendu lub dodatkowego mechanizmu uwierzytelniania.
