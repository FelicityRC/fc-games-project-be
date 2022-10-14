const { fetchCommentsByReviewId } = require("../models/comments.models");


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

module.exports = { getCommentsByReviewId };