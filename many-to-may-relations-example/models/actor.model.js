const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Actor = db.define('actor', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

module.exports = { Actor };
