const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const User = db.define('user', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		defaultValue: 'active',
	},
});

module.exports = { User };
