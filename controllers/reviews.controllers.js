const { fetchReviewById, getNewVotes } = require("../models/reviews.models");

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
  getNewVotes(review_id, inc_votes)
  .then((vote) => {
    response.status(200).send(vote);
  })
  .catch(next);
}

module.exports = { getReviewById, updateVotes };
