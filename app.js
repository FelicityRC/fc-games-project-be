const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/api-router");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (request, response) => {
  response.status(404).send({ msg: "not found" });
});

app.use((err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "invalid id" });
  } else {
    next(err);
  }
});

app.use((err, request, response, next) => {
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, request, response, next) => {
  response.status(500).send({ msg: "internal server error" });
});

module.exports = app;
