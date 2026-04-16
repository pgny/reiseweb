# Reiseweb

Eine Fullstack Reisekarte zum Verfolgen besuchter Orte auf einer interaktiven Karte. Pin auf einen besuchten Orte setzen, Notiz und Bewertung hinzufügen und Länderinformationen bekommen.

## Tech Stack

| Schicht  | Technologie | Version |
|----------|-------------|---------|
| Backend  | Spring Boot | 3.5.10  |
| Backend  | Java        | 17      |
| Backend  | H2 Datenbank | Dateibasiert |
| Backend  | Lombok      |         |
| Frontend | Angular     | 21      |
| Frontend | Leaflet     |         |
| Frontend | TypeScript  |         |

## Projektstruktur

```
reiseweb/
├── reiseweb-persistenz/    # Entitäten + Repositories
├── reiseweb-service/       # Service-Schicht (Geschäftslogik)
├── reiseweb-rest/          # REST-Controller (Spring Boot App)
└── reiseweb-frontend/      # Angular Frontend
```

## Voraussetzungen

- Java 17+
- Maven 3.8+
- Node.js 18+
- npm 9+

## Installation

### Backend

```bash
# Alle Module bauen
./mvnw clean install

# Anwendung starten (Port 8080)
./mvnw -pl reiseweb-rest spring-boot:run
```

Die H2-Datenbank ist dateibasiert und wird unter `./data/traveldb` gespeichert. Die H2-Konsole ist unter `http://localhost:8080/h2-console` erreichbar.

### Frontend

```bash
cd reiseweb-frontend

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten (Port 4200)
ng serve
```

## API-Endpunkte

| Ressource | Basispfad        | Beschreibung              |
|-----------|-----------------|---------------------------|
| Länder    | `/api/countries` | CRUD-Operationen für Länder |
| Städte    | `/api/cities`    | CRUD-Operationen für Städte |
| Pins      | `/api/pins`      | Verwaltung von Reise-Pins  |
| Bilder    | `/api/images`    | Bild-Upload und -Download  |

## Funktionen

- Interaktive Leaflet-Weltkarte mit klickbaren Ländern
- Reise-Pins mit Notizen, Bewertungen (1-5) und Besuchsdatum
- Länderinfos über REST Countries API (Flagge, Bevölkerung, Sprachen, etc.)
- Automatische Land- und Stadterkennung via Reverse Geocoding
- Bilder-Upload pro Pin
- Besuchte Länder werden auf der Karte hervorgehoben
- Deutsche Benutzeroberfläche

## TODO

- Gemini API Integration
- Von H2 auf Liquibase
