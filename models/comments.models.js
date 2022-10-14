const db = require("../db/connection");
const { fetchReviewById } = require("./reviews.models")


function fetchCommentsByReviewId(comments) {
//fetchReviewById()

  let queryStr = `SELECT * FROM comments
                    WHERE review_id=2
                    ORDER BY created_at DESC;`;

  return db.query(queryStr, [comments]).then(({ rows }) => {
    if (rows) {
      return Promise.reject({ status: 400, msg: "not found" });
    } else {
      return rows;
    }
  });
}

module.exports = { fetchCommentsByReviewId };
