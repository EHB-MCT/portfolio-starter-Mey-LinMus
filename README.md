# Portfolio

 Hier vind je informatie over de ontwikkeling, endpoints en het gebruik van dit project.

## Inhoudsopgave

- [Portfolio](#portfolio)
  - [Inhoudsopgave](#inhoudsopgave)
  - [Beschrijving](#beschrijving)
  - [Ontwikkeling](#ontwikkeling)
  - [1: Projectafhankelijkheden installeren](#1-projectafhankelijkheden-installeren)
  - [2: Projectafhankelijkheden installeren](#2-projectafhankelijkheden-installeren)
- [Endpoints](#endpoints)
  - [GET /users](#get-users)
  - [POST /user](#post-user)
  - [PATCH /user/:id](#patch-userid)
  - [DELETE /user/:id](#delete-userid)
- [Docker](#docker)

## Beschrijving
Dit project is een Node.js-applicatie met een Express.js-server en een MySQL-database. Het dient als een eenvoudig systeem voor het beheren van gebruikersgegevens via API-eindpunten. Docker wordt gebruikt om de applicatie en de database te isoleren en te draaien.


## Ontwikkeling
Dit project is ontwikkeld met behulp van Node.js en gebruikt verschillende npm-pakketten. Volg de onderstaande stappen om het project lokaal in te stellen en te draaien:

1. Project clonen:

   git clone [https://github.com/EHB-MCT/portfolio-starter-Mey-LinMus.git]


## 1: Projectafhankelijkheden installeren

```bash
npm install
```

## 2: Projectafhankelijkheden installeren

```bash
npm start
```


# Endpoints

- `GET /users`: Haal een lijst op van alle gebruikers.
- `POST /user`: Voeg een nieuwe gebruiker toe.
- `PATCH /user/:id`: Werk een bestaande gebruiker bij op basis van de gebruikers-ID.
- `DELETE /user/:id`: Verwijder een gebruiker op basis van de gebruikers-ID.

Hier is hoe je deze endpoints kunt gebruiken:

## GET /users
Haal een lijst op van alle gebruikers.

**Request:**

GET http://localhost:3000/users

**Response:**
[
  {
    "id": "uuid",
    "name": "Gebruikersnaam",
    "birthday": "Geboortedatum",
    "age": Leeftijd
  },
  // Andere gebruikers...
]


## POST /user
Voeg een nieuwe gebruiker toe.

**Request:**

POST -H "Content-Type: application/json" -d '{
  "name": "Nieuwe Gebruiker",
  "birthday": "Geboortedatum",
  "age": Leeftijd
}' http://localhost:3000/user

**Response**:
{
  "name": "Nieuwe Gebruiker",
  "birthday": "Geboortedatum",
  "age": Leeftijd
}


## PATCH /user/:id
Werk een bestaande gebruiker bij op basis van de gebruikers-ID.

**Request:**

PATCH -H "Content-Type: application/json" -d '{
  "name": "Bijgewerkte Gebruiker",
  "birthday": "Nieuwe Geboortedatum",
  "age": Nieuwe Leeftijd
}' http://localhost:3000/user/nieuwe-uuid

**Response:**
{
  "id": "nieuwe-uuid",
  "name": "Bijgewerkte Gebruiker",
  "birthday": "Nieuwe Geboortedatum",
  "age": Nieuwe Leeftijd
}


## DELETE /user/:id
Verwijder een gebruiker op basis van de gebruikers-ID.

**Request:**

DELETE http://localhost:3000/user/nieuwe-uuid

**Response:**

HTTP-statuscode 200 voor een succesvolle verwijdering.


# Docker

Dit project is geconfigureerd voor gebruik met Docker. De Docker-configuratie is te vinden in het docker-compose.yml bestand.

Voer het volgende commando uit om de Docker-containers te bouwen en te starten:

```bash
docker-compose up --build
```

Hiermee worden zowel de applicatie als de databasecontainer gestart.

De applicatie is toegankelijk via http://localhost:8080.

