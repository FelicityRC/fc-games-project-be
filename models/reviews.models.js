const db = require("../db/connection");

function fetchReviewById(review_id) {
  let queryStr = `SELECT reviews.*, COUNT(comments.review_id) ::INT AS comment_count 
                  FROM reviews
                  LEFT JOIN comments 
                  ON reviews.review_id = comments.review_id
                  WHERE reviews.review_id = $1
                  GROUP BY reviews.review_id;
                  `;

  return db.query(queryStr, [review_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "not found" });
    } else {
      return rows[0];
    }
  });
}

function fetchNewVotes(review_id, inc_votes) {
  if (!inc_votes) {
    return Promise.reject({ status: 400, msg: "no votes to add" });
  } else {
    return db
      .query(
        `         UPDATE reviews
                  SET votes = votes + $1
                  WHERE review_id = $2 
                  RETURNING *;`,

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

function fetchReviews(sort_by = "created_at", order_by = "desc", category) {
  const validSortByQueries = [
    "review_id",
    "title",
    "designer",
    "owner",
    "review_img_url",
    "review_body",
    "category",
    "created_at",
    "votes",
  ];

  const validOrderQueries = ["asc", "desc"];

  const validCategories = [
    "euro game",
    "social deduction",
    "dexterity",
    "children's games",
    "strategy",
    "hidden-roles",
    "push-your-luck",
    "roll-and-write",
    "deck-building",
    "engine-building",
  ];

  let queryStr = `
                  SELECT reviews.*, COUNT(comments.review_id) ::INT AS comment_count 
                  FROM reviews
                  LEFT JOIN comments 
                  ON reviews.review_id = comments.review_id

                  `;
  if (category) {
    if (validCategories.includes(category)) {
      queryStr += `WHERE category = '${category}' `;
    } else {
      return Promise.reject({ status: 404, msg: "category not found" });
    }
  }
  if (
    validSortByQueries.includes(sort_by) &&
    validOrderQueries.includes(order_by)
  ) {
    queryStr += `GROUP BY reviews.review_id  
                 ORDER BY ${sort_by} ${order_by};`;
  } else {
    return Promise.reject({ status: 404, msg: "not found" });
  }

  return db.query(queryStr).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "not found" });
    }
    return rows;
  });
}

// if no category specified then doesn't add queried category to the query.
// if (category===undefined)
//   return Promise.reject({status: 404, msg: "category not found"})

module.exports = { fetchReviews, fetchReviewById, fetchNewVotes };
