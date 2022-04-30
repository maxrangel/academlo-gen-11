const express = require('express');

// Controllers
const {
	getAllRepairs,
	createRepair,
	getRepairById,
	repairCancelled,
	repairCompleted,
} = require('../controllers/repairs.controller');

const router = express.Router();

router.get('/', getAllRepairs);

router.post('/', createRepair);

router.get('/:id', getRepairById);

router.patch('/:id', repairCompleted);

router.delete('/:id', repairCancelled);

module.exports = { repairsRouter: router };
