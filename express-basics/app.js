const express = require('express');

// Init express app
const app = express();

// Dummy data
const users = [
	{ id: 1, name: 'Joe' },
	{ id: 2, name: 'John' },
	{ id: 3, name: 'Sara' },
];

const posts = [
	{ id: 1, title: 'Post 1' },
	{ id: 2, title: 'Post 2' },
	{ id: 3, title: 'Post 3' },
];

// Enable incoming JSON data
app.use(express.json());

// Endpoints
app.get('/users', (req, res) => {
	res.status(200).json({
		users,
	});
});

app.get('/posts', (req, res) => {
	res.status(200).json({ posts });
});

app.post('/users', (req, res) => {
	const { name } = req.body;

	const newUser = {
		id: Math.floor(Math.random() * 1000),
		name,
	};

	users.push(newUser);

	res.status(201).json({ newUser });
});

const PORT = 4000;

app.listen(PORT, () => {
	console.log(`Express app running on port: ${PORT}`);
});
