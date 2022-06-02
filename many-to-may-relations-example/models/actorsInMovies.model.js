const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const ActorInMovie = db.define('actorInMovie', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  actorId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  movieId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

module.exports = { ActorInMovie };
