const express = require('express');

// Routers
const { usersRouter } = require('./routers/users.routes');
const { repairsRouter } = require('./routers/repairs.routes');

const { globalErrorHandler } = require('./controllers/error.controller');

const app = express();

// Enable incoming JSON data
app.use(express.json());

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

// Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };
