# Northcoders Games Reviews Site

To view the fully hosted site vist:

https://reviewsable.netlify.app/

## Backend Repo

https://github.com/FelicityRC/fc-games-project-be


## Installation

git clone: 

https://github.com/FelicityRC/fc-games-project-be

npm install

npm run setup-dbs

set up .env files (see details below)

npm run seed

Run tests:

npm test

Start server:

npm start.env files information


## Minimum Requirements

Node v18.9
PostgreSQL v14.5


## You will need to create two .env files for your project: 

.env.test and .env.development. 
Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.
