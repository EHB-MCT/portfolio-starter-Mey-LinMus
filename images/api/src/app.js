const express = require("express");
const knex = require("knex");
const knexfile = require("./db/knexfile");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
/**
 * Start the Express server and listen on the specified port.
 *
 * @function startServer
 * @param {number} port - The port number on which the server should listen.
 * @param {Function} callback - A callback function to execute when the server starts.
 * @returns {void}
 *
 */

const app = express();

const db = knex(knexfile.development);

db.raw("SELECT 1+1").then(() => console.log("done"));

app.use(express.json());

app.use("", userRoutes(db));
app.use("", commentRoutes(db));

module.exports = app;
