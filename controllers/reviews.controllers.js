const {
  fetchReviews,
  fetchReviewById,
  fetchNewVotes,
} = require("../models/reviews.models");

function getReviewById(request, response, next) {
  const { review_id } = request.params;

  fetchReviewById(review_id)
    .then((review) => {
      response.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
}

function updateVotes(request, response, next) {
  const { inc_votes } = request.body;
  const { review_id } = request.params;
  fetchNewVotes(review_id, inc_votes)
    .then((vote) => {
      response.status(200).send(vote);
    })
    .catch(next);
}

function getReviews(request, response, next) {
  const { sort_by, order_by, category } = request.query;
  fetchReviews(sort_by, order_by, category)
    .then((reviews) => {
      response.status(200).send({reviews});
    })
    .catch(next);
}

module.exports = { getReviews, getReviewById, updateVotes };
