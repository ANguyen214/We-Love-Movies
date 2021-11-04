const router = require("express").Router();
const controller = require("./movies.controller");
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

// router.use("/:movieId/theaters", controller.movieExists, theatersRouter);
// router.use("/:movieId/reviews", controller.movieExists, reviewsRouter);

router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

router.route("/:movieId/theaters")
    .get(controller.getTheaters)
    .all(methodNotAllowed);

router.route("/:movieId/reviews")
    .get(controller.getReviews)
    .all(methodNotAllowed);

module.exports = router;