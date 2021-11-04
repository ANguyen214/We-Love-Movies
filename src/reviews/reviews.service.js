const knex = require("../db/connection");

function reviewsAndCritics(reviewId){
    return knex("reviews")
        .join("critics", "reviews.critic_id", "critics.critic_id")
        .select(
            "*",
            "critics.critic_id",
            "critics.created_at",
            "critics.updated_at",
        )
        .where({ "reviews.review_id": reviewId});
}

function list(movieId){
    return knex("reviews")
        .join("critics", "reviews.critic_id", "critics.critic_id")
        .select(
            "*",
            "critics.critic_id",
            "critics.created_at",
            "critics.updated_at",
        )
        .where({ "reviews.movie_id": movieId });
}

function read(reviewId){
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first();
}

function update(review){
    return knex("reviews")
        .join("critics", "reviews.critic_id", "critics.critic_id")
        .select(
            "*",
            "critics.critic_id",
            "critics.created_at",
            "critics.updated_at",
        )
        .where({ review_id: review.review_id })
        .update({ ...review })
        .returning("*");
}

function destroy(reviewId){
    return knex("reviews")
        .where({ review_id: reviewId })
        .del();
}

module.exports = {
    list, 
    read, 
    update,
    delete: destroy,
    reviewsAndCritics,
}