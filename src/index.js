const express = require('express');
const knex = require('knex');
const knexfile = require('./knexfile');
const routes = require('./routes');

/**
 * Start the Express server and listen on the specified port.
 *
 * @function startServer
 * @param {number} port - The port number on which the server should listen.
 * @param {Function} callback - A callback function to execute when the server starts.
 * @returns {void}
 */
function startServer(port, callback) {
  app.listen(port, callback);
}

const app = express();
const PORT = process.env.PORT || 3000;


const db = knex(knexfile.development);

app.use(express.json());


app.use('/', routes(db));


startServer(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
