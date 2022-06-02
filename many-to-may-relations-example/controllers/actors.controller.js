// Models
const { Actor } = require('../models/actor.model');
const { Movie } = require('../models/movie.model');
const { ActorInMovie } = require('../models/actorsInMovies.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');

const getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({ include: [{ model: Movie }] });

  res.status(200).json({ actors });
});

const createActor = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const newActor = await Actor.create({ name });

  res.status(201).json({ newActor });
});

const assignActorToMovie = catchAsync(async (req, res, next) => {
  const { actorId, movieId } = req.body;

  await ActorInMovie.create({ actorId, movieId });

  res.status(201).json({ status: 'success' });
});

module.exports = { getAllActors, createActor, assignActorToMovie };
