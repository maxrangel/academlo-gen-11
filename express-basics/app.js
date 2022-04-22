const express = require('express');
const { Sequelize } = require('sequelize');

// Routers
const { usersRouter } = require('./routes/users.routes');

// Init express app
const app = express();

// Enable incoming JSON data
app.use(express.json());

// Endpoints
// http://localhost:4000/api/v1/users
app.use('/api/v1/users', usersRouter);

// app.get('/posts', (req, res) => {
// 	res.status(200).json({ posts });
// });

const db = new Sequelize({
	dialect: 'postgres',
	host: 'localhost',
	username: 'postgres',
	password: 'pass1234',
	database: 'blogs',
});

db.authenticate()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));

// Spin up server
const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Express app running on port: ${PORT}`);
});
