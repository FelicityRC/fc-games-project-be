const reviewRouter = require("express").Router();

const {
  getCommentsByReviewId,
  postCommentOnReview,
} = require("../controllers/comments.controllers");

const {
  getReviewById,
  updateVotes,
  getReviews,
} = require("../controllers/reviews.controllers");

reviewRouter.route("/").get(getReviews);

reviewRouter.route("/:review_id").get(getReviewById).patch(updateVotes);

reviewRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewId)
  .post(postCommentOnReview);

module.exports = reviewRouter;
