const express = require('express');

// Middlewares
const {
	protectToken,
	protectEmployee,
} = require('../middlewares/users.middlewares');
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

router.use(protectToken);

router.get('/completed', getAllCompletedRepairs);

router.get('/pending', protectEmployee, getAllPendingRepairs);

router.post('/', createRepairValidations, checkValidations, createRepair);

router.get('/:id', protectEmployee, pendingRepairExists, getRepairById);

router.patch('/:id', protectEmployee, pendingRepairExists, repairCompleted);

router.delete('/:id', protectEmployee, pendingRepairExists, repairCancelled);

module.exports = { repairsRouter: router };
