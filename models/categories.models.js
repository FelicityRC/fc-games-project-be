const db = require("../db/connection");

function fetchCategories() {
 // const categoryTypes = ["slug", "description"];
  let queryStr = `SELECT * FROM categories;`;

  return db.query(queryStr).then(({ rows }) => {
    if (!rows) {
      //if(!rows.review_id.includes(category)) {
      return Promise.reject({ status: 400, msg: "not found" });
    } else {
      return rows;
    }
  });
}

module.exports = { fetchCategories };
