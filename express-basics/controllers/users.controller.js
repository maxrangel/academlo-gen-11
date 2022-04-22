const { users } = require('../models/user.model')

const getAllUsers = (req, res) => {
	res.status(200).json({
		users,
	});
};

const createUser = (req, res) => {
	const { name } = req.body;

	const newUser = {
		id: Math.floor(Math.random() * 1000),
		name,
	};

	users.push(newUser);

	res.status(201).json({ newUser });
};

module.exports = { getAllUsers, createUser };
