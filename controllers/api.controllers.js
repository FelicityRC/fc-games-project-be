const { fetchEndpoints } = require("../models/api.models");

function getEndpoints(req, res, next) {
  req.query;
  fetchEndpoints()
    .then((api) => {
      res.status(200).send({ api });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getEndpoints };
