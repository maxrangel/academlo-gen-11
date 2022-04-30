const express = require('express');

// Routers
const { usersRouter } = require('./routers/users.routes');
const { repairsRouter } = require('./routers/repairs.routes');

// Utils
const { db } = require('./utils/database');

const app = express();

// Enable incoming JSON data
app.use(express.json());

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

// Authenticate db credentials
db.authenticate()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));

db.sync()
	.then(() => console.log('Database synced'))
	.catch(err => console.log(err));

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Express app running on port ${PORT}`);
});
