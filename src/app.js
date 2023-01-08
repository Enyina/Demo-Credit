const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const knex = require("./db/db");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//health check
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(errorHandler);

module.exports = app;
