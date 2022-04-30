// Models
const { Repair } = require('../models/repair.model');

const getAllRepairs = async (req, res) => {
	try {
		const repairs = await Repair.findAll({ where: { status: 'pending' } });

		res.status(200).json({
			repairs,
		});
	} catch (err) {
		console.log(err);
	}
};

const getRepairById = async (req, res) => {
	try {
		const { id } = req.params;

		const repair = await Repair.findOne({ where: { id, status: 'pending' } });

		if (!repair) {
			return res.status(404).json({
				status: 'error',
				message: 'No repair found with the given id',
			});
		}

		res.status(200).json({
			repair,
		});
	} catch (error) {
		console.log(error);
	}
};

const createRepair = async (req, res) => {
	try {
		const { userId, date } = req.body;

		const newRepair = await Repair.create({ userId, date });

		res.status(201).json({
			newRepair,
		});
	} catch (error) {
		console.log(error);
	}
};

const repairCompleted = async (req, res) => {
	try {
		const { id } = req.params;

		const repair = await Repair.findOne({ where: { id, status: 'pending' } });

		if (!repair) {
			return res.status(404).json({
				status: 'error',
				message: 'Cannnot update repair because it does not exists',
			});
		}

		await repair.update({ status: 'completed' });

		res.status(200).json({ status: 'success' });
	} catch (error) {
		console.log(error);
	}
};

const repairCancelled = async (req, res) => {
	try {
		const { id } = req.params;

		const repair = await Repair.findOne({ where: { id, status: 'pending' } });

		if (!repair) {
			return res.status(404).json({
				status: 'error',
				message: 'Cannnot cancel repair because it does not exists',
			});
		}

		await repair.update({ status: 'cancelled' });

		res.status(200).json({ status: 'success' });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllRepairs,
	getRepairById,
	createRepair,
	repairCompleted,
	repairCancelled,
};
