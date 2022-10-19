const db = require("../db/connection");
const { fetchReviewById } = require("./reviews.models");

function fetchCommentsByReviewId(review_id) {
  let queryStr = `SELECT * FROM comments
                  WHERE review_id=$1
                  ORDER BY created_at DESC;`;

  return fetchReviewById(review_id).then(({}) => {
    return db
      .query(queryStr, [review_id])
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({
            status: 200,
            comments: "no comments for this review id",
          });
        }
        return rows;
      })
      .catch((err) => {
        return Promise.reject({ status: err, msg: err.msg });
      });
  });
}

function addCommentToReview(review_id, username, body) {
  if (!body || !username) {
    return Promise.reject({
      status: 400,
      msg: "author name and/or comment is missing",
    });
  }

  return db
    .query(
      `        INSERT INTO comments (author, body, review_id) VALUES ($1, $2, $3) RETURNING *;
        `,
      [username, body, review_id]
    )
    .then(({ rows }) => {
      const addComment = rows[0];
      return addComment;
    });
}

module.exports = { fetchCommentsByReviewId, addCommentToReview };
