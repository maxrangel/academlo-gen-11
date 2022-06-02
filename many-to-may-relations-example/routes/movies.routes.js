const express = require('express');

// Controller
const {
  createMovie,
  getAllMovies,
} = require('../controllers/movies.controller');

const router = express.Router();

router.route('/').get(getAllMovies).post(createMovie);

module.exports = { moviesRouter: router };
