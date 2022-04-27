const { Sequelize } = require('sequelize');

// Create a connection to database
const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'pass1234',
  database: 'blogs',
  logging: false,
});

module.exports = { db };
