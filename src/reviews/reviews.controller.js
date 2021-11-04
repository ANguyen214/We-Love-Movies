const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reviews.service");
const reduceProperties = require("../utils/reduce-properties");

const critics = reduceProperties("critic_id", {
    criticId: ["critic", "critic_id"],
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"],
    created: ["critic", "created_at"],
    updated: ["critic", "updated_at"],
});

function hasValidReview(req, res, next) {
    const data = req.body.data;

    if(data){
        res.locals.reviewBody = data;
        return next();
    }

    next({
        status: 400,
        message: "Review is invalid. Must contain data."
    });
}

async function reviewExists(req, res, next){
    const foundReview = await service.read(req.params.reviewId);

    if(foundReview){
        res.locals.foundReview = foundReview;
        return next();
    }

    next({
        status: 404,
        message: "Review cannot be found."
    });
}

async function list(req, res){
    const criticData = critics(data);
    res.json({ data: criticData });
}

async function update(req, res){
    const updatedReview = res.locals.reviewBody;
    updatedReview.review_id = req.params.reviewId;
    await service.update(updatedReview);
    const data = await service.reviewsAndCritics(updatedReview.review_id);
    const criticData = critics(data);
    res.json({ data: criticData[0] }); 
}

async function destroy(req, res){
    const review = res.locals.foundReview;
    await service.delete(review.review_id);
    res.sendStatus(204);
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    update: [
        asyncErrorBoundary(reviewExists), 
        hasValidReview, 
        asyncErrorBoundary(update)
    ],
    delete: [
        asyncErrorBoundary(reviewExists), 
        asyncErrorBoundary(destroy)
    ],
}