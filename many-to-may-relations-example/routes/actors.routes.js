const express = require('express');

// Controller
const {
  createActor,
  getAllActors,
} = require('../controllers/actors.controller');

const router = express.Router();

router.route('/').get(getAllActors).post(createActor);

module.exports = { actorsRouter: router };
