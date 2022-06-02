const express = require('express');

// Controller
const {
  createActor,
  getAllActors,
  assignActorToMovie,
} = require('../controllers/actors.controller');

const router = express.Router();

router.route('/').get(getAllActors).post(createActor);

router.post('/assign-actor-to-movie', assignActorToMovie);

module.exports = { actorsRouter: router };
