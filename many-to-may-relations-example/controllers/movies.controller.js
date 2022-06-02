// Models
const { Movie } = require('../models/movie.model');
const { Actor } = require('../models/actor.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');

const getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    include: [{ model: Actor }],
  });

  res.status(200).json({ movies });
});

const createMovie = catchAsync(async (req, res, next) => {
  const { title } = req.body;

  const newMovie = await Movie.create({ title });

  res.status(201).json({ newMovie });
});

module.exports = { getAllMovies, createMovie };
