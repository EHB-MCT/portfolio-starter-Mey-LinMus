const express = require('express');
const knex = require('knex');
const knexfile = require('./app'); 
const app = express();
const PORT = process.env.PORT || 3000;

// Create a Knex.js instance
const db = knex(knexfile.development);

app.use(express.json());

// Define your API routes and handlers here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});