const { fetchComments } = require("../models/comments.models");

function getComments(request, response, next) {
  request.query;
  fetchComments()
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getComments };