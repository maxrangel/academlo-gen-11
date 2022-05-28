const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// Routers
const { usersRouter } = require('./routers/users.routes');
const { repairsRouter } = require('./routers/repairs.routes');

const { globalErrorHandler } = require('./controllers/error.controller');

const app = express();

// Enable incoming JSON data
app.use(express.json());

// Add more secure headers
app.use(helmet());

// Compress responses
app.use(compression());

// Enable incoming requests logs
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

// Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };
