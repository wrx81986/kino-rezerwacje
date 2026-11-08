
# Architektura systemu rezerwacji miejsc w kinie

System wykorzystuje architekturę trójwarstwową, składającą się z warstwy prezentacji, warstwy aplikacyjnej oraz warstwy danych.

## Schemat architektury

```mermaid
flowchart TD
    A["Użytkownik"] --> B["Frontend<br/>React + Vite"]
    B -->|"HTTP / JSON"| C["Backend<br/>Node.js + Express"]
    C --> D["Routes i Controllers"]
    D -->|"SQL / pg"| E["PostgreSQL<br/>Google Cloud SQL"]

    E -->|"Wyniki zapytań"| D
    D -->|"Odpowiedź JSON"| C
    C -->|"HTTP Response"| B

    subgraph Presentation["Warstwa prezentacji"]
        B
    end

    subgraph Application["Warstwa aplikacyjna"]
        C
        D
    end

    subgraph Data["Warstwa danych"]
        E
    end
```

## Opis warstw

1. **Warstwa prezentacji:** React i Vite odpowiadają za interfejs użytkownika oraz wyświetlanie danych.
2. **Warstwa aplikacyjna:** Node.js i Express obsługują żądania HTTP, REST API, walidację oraz logikę operacji CRUD.
3. **Warstwa danych:** PostgreSQL w Google Cloud SQL przechowuje dane o filmach.

## Przepływ danych

1. Użytkownik wykonuje operację w aplikacji React.
2. Front-end wysyła żądanie HTTP do REST API.
3. Back-end przetwarza żądanie i wykonuje odpowiednie zapytanie SQL.
4. PostgreSQL zwraca wyniki do back-endu.
5. Express przekazuje odpowiedź w formacie JSON do front-endu.
6. React aktualizuje widok aplikacji.
