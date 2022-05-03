const express = require('express');
const cors = require('cors');

// Controllers
const { globalErrorHandler } = require('./controllers/errors.controller');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { postsRouter } = require('./routes/posts.routes');

// Init express app
const app = express();

// Enable CORS
app.use(cors());

// Enable incoming JSON data
app.use(express.json());

// Endpoints
// http://localhost:4000/api/v1/users
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter);

// Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };
