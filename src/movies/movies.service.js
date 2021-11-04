const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list(showing){
    if(showing){
        return knex("movies")
        .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
        .select("movies.*")
        .where({ "movies_theaters.is_showing": true })
        .distinct();
    } 
    
    return knex("movies").select("*");  
}

function read(movieId){
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId })
        .first();
}

const criticMap = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

function getTheaters(movieId) {
    return knex("theaters")
        .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
        .select("*")
        .where({ movie_id: movieId, is_showing: true });
}

function getReviews(movieId) {
    return knex("reviews")
        .join("critics", "reviews.critic_id", "critics.critic_id")
        .select("*")
        .where({ movie_id: movieId })
        .then((result) => {
            const returnList = [];
            result.forEach((obj) => {
                const criticObj = criticMap(obj);
                returnList.push(criticObj);
            });
            return returnList;
        });
}

module.exports = {
    list, 
    read,
    getReviews,
    getTheaters,
}