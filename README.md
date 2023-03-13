# Northcoders Games Reviews Project

## Description

This is the backend for my site using Express, Node.js, MVC Architecture and RESTful API Design.

Live Build:

- https://reviewsable.netlify.app/

Frontend Repo:

- https://github.com/FelicityRC/fc-games-project

## Installation

- git clone: https://github.com/FelicityRC/fc-games-project-be

- npm install

- npm run setup-dbs

- set up .env files (see details below)

- npm run seed

Run tests:

- npm test

Start server:

- npm start

## You will need to create two .env files

.env.test and .env.development.
Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are in a .gitignore file.

## Minimum Requirements

- Node v18.9
- PostgreSQL v14.5
