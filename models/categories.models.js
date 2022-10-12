const db = require("../db/connection");

function fetchCategories() {

  return db.query(`SELECT * FROM categories;`).then(({ rows }) => {

    return rows;
  })
}

module.exports = { fetchCategories };
