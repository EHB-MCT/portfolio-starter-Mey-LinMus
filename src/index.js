const express = require('express');
const knex = require('knex');
const knexfile = require('./knexfile'); 
const routes = require('./routes'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Create a Knex.js instance
const db = knex(knexfile.development);

app.use(express.json());

// Use the routes defined in routes.js
app.use('/', routes(db));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
