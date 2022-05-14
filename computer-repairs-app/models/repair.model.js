const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Repair = db.define('repair', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	computerNumber: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	comments: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'pending',
	},
});

module.exports = { Repair };
