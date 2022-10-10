const express = require("express");

const { getCategories } = require("./controllers/controllers");

const app = express();

app.use(express.json());

app.get("/api/categories", getCategories);

app.all("/*", (request, response) => {
  response.status(404).send({ msg: "not found" });
  });

app.use((err, request, response, next) => {
  if (err.status === 400) {
    response.status(400).send({ msg: "bad request" });
  }
  next(err);
});

app.use((err, request, response, next) => {
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

app.use((err, request, response, next) => {
  response.status(500).send({ msg: "internal server error" });
});

module.exports = app;
