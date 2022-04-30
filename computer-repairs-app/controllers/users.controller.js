// Models
const { User } = require('../models/user.model');

const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll();

		res.status(200).json({
			users,
		});
	} catch (err) {
		console.log(err);
	}
};

const getUserById = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findOne({ where: { id } });

		if (!user) {
			return res.status(404).json({
				status: 'error',
				message: 'No user found with the given id',
			});
		}

		res.status(200).json({
			user,
		});
	} catch (error) {
		console.log(error);
	}
};

const createUser = async (req, res) => {
	try {
		const { name, email, password, role } = req.body;

		const newUser = await User.create({ name, email, password, role });

		res.status(201).json({
			newUser,
		});
	} catch (error) {
		console.log(error);
	}
};

const updateUser = async (req, res) => {
	try {
		const { name, email } = req.body;
		const { id } = req.params;

		const user = await User.findOne({ where: { id } });

		if (!user) {
			return res.status(404).json({
				status: 'error',
				message: 'Cannnot update user because it does not exists',
			});
		}

		await user.update({ name, email });

		res.status(200).json({ status: 'success' });
	} catch (error) {
		console.log(error);
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findOne({ where: { id } });

		if (!user) {
			return res.status(404).json({
				status: 'error',
				message: 'Cannnot delete user because it does not exists',
			});
		}

		await user.update({ status: 'deleted' });

		res.status(200).json({ status: 'success' });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
};
