const express = require("express");
const cors = require("cors");
const knex = require("knex");
const knexfile = require("./db/knexfile");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

const db = knex(knexfile.development);

db.raw("SELECT 1+1").then(() => console.log("done"));

app.use(express.json());


app.use(cors());


app.use("", userRoutes(db));
app.use("", commentRoutes(db));

module.exports = app;
