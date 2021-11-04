const knex = require("../db/connection");

function list(movieId) {
    if (movieId) {
        return knex("theaters")
            .join(
                "movies_theaters", 
                "theaters.theater_id", 
                "movies_theaters.theater_id",
                )
            .select(
                "theaters.*",
                "movies_theaters.is_showing",
                "movies_theaters.movie_id",
            )
            .where({ "movies_theaters.movie_id": movieId });
    }
    return knex("theaters")
        .join(
            "movies_theaters", 
            "theaters.theater_id", 
            "movies_theaters.theater_id",
        )
        .join(
            "movies", 
            "movies.movie_id", 
            "movies_theaters.movie_id",
            )
        .select(
            "*", 
            "movies_theaters.theater_id ", 
            "movies.created_at", 
            "movies.updated_at",
            );
}

module.exports = {
    list
}