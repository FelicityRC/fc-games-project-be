const { fetchApi } = require("../models/api.models");

function getApi(req, res, next) {
  req.query;
  fetchApi()
    .then((api) => {
      res.status(200).send({ api });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getApi };
