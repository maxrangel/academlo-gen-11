const http = require('http');

const server = http.createServer((request, response) => {
	console.log(request);
  response.end();
});

const PORT = 3000;

// http://localhost:PORT
server.listen(PORT);
