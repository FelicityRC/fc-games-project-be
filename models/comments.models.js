const db = require("../db/connection");
const { fetchReviewById } = require("./reviews.models");

function fetchCommentsByReviewId(id) {
  let queryStr = `SELECT * FROM comments
    WHERE review_id=$1
    ORDER BY created_at DESC;`;

  return fetchReviewById(id).then(({}) => {
    return db
      .query(queryStr, [id])
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

module.exports = { fetchCommentsByReviewId };
