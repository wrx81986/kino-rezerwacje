# System rezerwacji miejsc w kinie

## 1. Opis projektu

Projekt przedstawia aplikację internetową umożliwiającą rezerwację miejsc w kinie. Użytkownik może przeglądać dostępne filmy i seanse, wybierać miejsca na sali kinowej oraz zarządzać swoimi rezerwacjami.

## 2. Cel projektu

Celem projektu jest stworzenie systemu umożliwiającego wygodne zarządzanie rezerwacjami miejsc kinowych z wykorzystaniem architektury trójwarstwowej i usług chmurowych Google Cloud.

## 3. Funkcjonalności aplikacji

- Rejestracja i logowanie użytkowników.
- Przeglądanie listy filmów i seansów.
- Wyświetlanie szczegółów filmu i seansu.
- Interaktywny wybór miejsc na sali kinowej.
- Tworzenie rezerwacji.
- Wyświetlanie własnych rezerwacji.
- Zmiana zarezerwowanego miejsca.
- Anulowanie rezerwacji.
- Blokada zmiany miejsca na 30 minut przed rozpoczęciem seansu.
- Walidacja danych po stronie front-endu i back-endu.

## 4. Wykorzystane technologie

| Element | Technologia |
|---|---|
| Front-end | React |
| Back-end | Node.js, Express |
| Komunikacja | REST API |
| Baza danych | Google Cloud Firestore |
| Uwierzytelnianie | Firebase Authentication |
| Hosting front-endu | Firebase Hosting |
| Hosting back-endu | Google Cloud Run |
| Kontrola wersji | Git, GitHub |

## 5. Architektura systemu

Aplikacja wykorzystuje architekturę trójwarstwową:

1. Warstwa prezentacji – React.
2. Warstwa aplikacyjna – Node.js + Express REST API.
3. Warstwa danych – Google Cloud Firestore.

Komunikacja pomiędzy front-endem i back-endem odbywa się za pomocą HTTP oraz JSON. Back-end komunikuje się z bazą danych za pomocą Firebase Admin SDK.

## 6. Struktura projektu

```text
kino-rezerwacje/
├── frontend/
├── backend/
├── config/
├── docs/
├── README.md
└── .gitignore
```

## 7. Uruchomienie lokalne

Wymagania:
- Node.js
- npm
- Git

Instrukcja uruchomienia zostanie uzupełniona po przygotowaniu front-endu, back-endu oraz konfiguracji bazy danych.

## 8. Zmienne środowiskowe

Konfiguracja aplikacji będzie przechowywana w zmiennych środowiskowych.

Przykładowe ustawienia:
- Adres REST API.
- Konfiguracja Firebase.
- Dane dostępowe do usług Google Cloud.

Pliki zawierające poufne dane nie będą umieszczane w repozytorium GitHub.

## 9. Wdrożenie

Planowane środowisko wdrożeniowe:

- Front-end – Firebase Hosting.
- Back-end – Google Cloud Run.
- Baza danych – Google Cloud Firestore.

Szczegółowa instrukcja wdrożenia zostanie uzupełniona po skonfigurowaniu środowiska chmurowego.

## 10. Autor projektu

Projekt indywidualny realizowany w ramach przedmiotu Projekt Zespołowy.
