const { fetchUsers } = require("../models/users.models");

function getUsers(request, response, next) {
  fetchUsers()
  .then((users) => {
      response.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getUsers };