# Strapi Application (Backend)

## To Install Packages
`npm install`

## To Run

### Ensure you have access to the MongoDB database.

1. Whitelist _only_ your IP in "Network Access", add your name to the description.
2. Add a user for yourself in "Database Access".

### Run Strapi.

1. Create a `.env` file and copy the contents of the `.env.example` file. Add your DB username and password to the `.env` file (this is gitignored).
2. `npm run develop`