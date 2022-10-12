const { fetchUsers } = require("../models/users.models");

function getUsers(request, response, next) {
  request.query;
  fetchUsers()
  .then((users) => {
      response.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getUsers };