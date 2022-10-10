const { fetchCategories } = require("../models/models")

function getCategories(request, response, next) {
    request.query;
    fetchCategories()
    .then((games) => {
        response.status(200).send({ body: games })
    })
    .catch((err) => {
        next(err);
    })
}





module.exports = { getCategories };