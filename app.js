const express = require("express");
const cors = require('cors');

const { getCategories } = require("./controllers/categories.controllers");
const {
  getReviews,
  getReviewById,
  updateVotes,
} = require("./controllers/reviews.controllers");
const { getUsers } = require("./controllers/users.controllers");
const {
  getCommentsByReviewId,
  postCommentOnReview,
} = require("./controllers/comments.controllers");
const { getEndpoints } = require("./controllers/api.controllers");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", getEndpoints);

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewById);
app.get("/api/users", getUsers);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);
app.patch("/api/reviews/:review_id", updateVotes);
app.post("/api/reviews/:review_id/comments", postCommentOnReview);

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
