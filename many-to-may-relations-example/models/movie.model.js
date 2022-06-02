const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Movie = db.define('movie', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

module.exports = { Movie };
