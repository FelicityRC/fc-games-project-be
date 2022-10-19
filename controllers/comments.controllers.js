const {
  fetchCommentsByReviewId,
  addCommentToReview,
} = require("../models/comments.models");

const { fetchReviewById } = require("../models/reviews.models");

function getCommentsByReviewId(request, response, next) {
  const { review_id } = request.params;

  fetchCommentsByReviewId(review_id)
    .then((comments) => {
      response.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
}

function postCommentOnReview(request, response, next) {
  const { review_id } = request.params;
  const { username, body } = request.body;

  fetchReviewById(review_id)
    .then(() => {
      addCommentToReview(review_id, username, body)
        .then((postedComment) => {
          response.status(201).send({ postedComment });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getCommentsByReviewId, postCommentOnReview };
