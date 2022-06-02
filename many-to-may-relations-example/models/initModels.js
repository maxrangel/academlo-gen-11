const { Actor } = require('./actor.model');
const { Movie } = require('./movie.model');

// Establish your models relations inside this function
const initModels = () => {
  // M Movie <--> M Actor
  Movie.belongsToMany(Actor, { through: 'actorInMovie' });
  Actor.belongsToMany(Movie, { through: 'actorInMovie' });
};

module.exports = { initModels };
