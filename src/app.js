const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const knex = require("./db/db");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/transactions", transactionRoutes);
//health check
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(errorHandler);

module.exports = app;
