const categoryRouter = require("express").Router();

const { getCategories } = require("../controllers/categories.controllers");

categoryRouter.route("/").get(getCategories);

module.exports = categoryRouter;
