const { fetchCategories } = require("../models/models");

function getCategories(request, response, next) {
  request.query;
  fetchCategories()
    .then((categories) => {
      response.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getCategories };
