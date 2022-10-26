const db = require("../db/connection");

function fetchCategories() {
  let queryStr = `SELECT * FROM categories;`;

  return db.query(queryStr).then(({ rows }) => {
    if (!rows) {
      return Promise.reject({ status: 400, msg: "not found" });
    } else {
      return rows;
    }
  });
}

module.exports = { fetchCategories };
