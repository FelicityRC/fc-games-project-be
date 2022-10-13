const db = require("../db/connection");

function fetchReviewById(review_id) {
  let queryStr = `SELECT reviews.*, COUNT(comments.review_id) ::INT AS comment_count FROM reviews
  LEFT JOIN comments ON reviews.review_id = comments.review_id
  WHERE reviews.review_id = $1 GROUP BY reviews.review_id;`;
  return db.query(queryStr, [review_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "not found" });
    } else {
      return rows[0];
    }
  });

}

function getNewVotes(review_id, inc_votes) {
  if (!inc_votes) {
    return Promise.reject({ status: 400, msg: "no votes to add" });
  } else {
    return db
      .query(
        `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;`,
        [inc_votes, review_id]
      )
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, msg: "not found" });
        }
        return rows[0];
      });
  }
}

module.exports = { fetchReviewById, getNewVotes };