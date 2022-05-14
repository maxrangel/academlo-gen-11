const express = require('express');

// Middlewares
const { pendingRepairExists } = require('../middlewares/repairs.middlewares');
const {
	createRepairValidations,
	checkValidations,
} = require('../middlewares/validators.middleware');

// Controllers
const {
	getAllCompletedRepairs,
	getAllPendingRepairs,
	createRepair,
	getRepairById,
	repairCancelled,
	repairCompleted,
} = require('../controllers/repairs.controller');

const router = express.Router();

router.get('/completed', getAllCompletedRepairs);

router.get('/pending', getAllPendingRepairs);

router.post('/', createRepairValidations, checkValidations, createRepair);

router.get('/:id', pendingRepairExists, getRepairById);

router.patch('/:id', pendingRepairExists, repairCompleted);

router.delete('/:id', pendingRepairExists, repairCancelled);

module.exports = { repairsRouter: router };
