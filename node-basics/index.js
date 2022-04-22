const http = require('http');

// DUMMY DATA
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

const server = http.createServer((req, res) => {
	const url = req.url;
	const method = req.method;

	if (method === 'GET' && url === '/users') {
		// Return users list
		res.write(JSON.stringify({ users }));
	} else if (method === 'GET' && url === '/posts') {
		// Return posts list
		res.write(JSON.stringify({ posts }));
	} else if (method === 'POST' && url === '/users') {
		// Create new user in database
		// on -> .addEventListener

		const userData = [];

		req.on('data', chunk => {
			userData.push(chunk);
		});

		req.on('end', () => {
			// name=Max
			const parsedData = Buffer.concat(userData).toString();

			// [name, Max]
			const name = parsedData.split('=')[1];

			const newUser = {
				id: Math.floor(Math.random() * 1000),
				name,
			};

			users.push(newUser);
		});
	} else if (method === 'POST' && url === '/posts') {
		const postData = [];

		req.on('data', chunk => {
			console.log(chunk);
			postData.push(chunk);
		});

		req.on('end', () => {
			// title=New title
			const parsedData = Buffer.concat(postData).toString();

			const title = parsedData.split('=')[1];

			const newPost = {
				id: Math.floor(Math.random() * 1000),
				title,
			};

			posts.push(newPost);
		});
	} else {
		res.write(`${url} is not a valid endpoint`);
	}

	res.end();
});

const PORT = 3000;

// http://localhost:PORT
server.listen(PORT);
