const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");

async function movieExists(req, res, next){
    const id = req.params.movieId;
    const movie = await service.read(id);

    if(movie){
        res.locals.movie = movie;
        return next();
    }
    next({
        status: 404,
        message: "Sorry, this movie cannot be found.",
    });
}

async function list(req, res){
    let isShowing = req.query.is_showing;
    const data = await service.list(isShowing);
    res.json({ data });
}

function read(req, res){
    const { movie: data } = res.locals;
    res.json({ data });
}

async function getTheaters(req, res){
    res.json({ data: await service.getTheaters(req.params.movieId) });
}

async function getReviews(req, res){
    res.json({ data: await service.getReviews(req.params.movieId) });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    movieExists: asyncErrorBoundary(movieExists),
    getTheaters: [asyncErrorBoundary(movieExists), getTheaters],
    getReviews: [asyncErrorBoundary(movieExists), getReviews],
}