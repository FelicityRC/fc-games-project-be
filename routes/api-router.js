const apiRouter = require("express").Router();
const categoryRouter = require("./categories-router");
const userRouter = require("./users-router");
const reviewRouter = require("./reviews-router");
const { getApi } = require("../controllers/api.controllers");

apiRouter.get("/", getApi);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/reviews", reviewRouter);

module.exports = apiRouter;
