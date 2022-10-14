const { fetchCommentsByReviewId } = require("../models/comments.models");
//const { fetchReviewById } = require("../models/reviews.models")


function getCommentsByReviewId(request, response, next) {
  const { id } = request.params;
  fetchCommentsByReviewId(id)
  console.log(id, "id")
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getCommentsByReviewId };