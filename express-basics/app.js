const express = require('express');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { postsRouter } = require('./routes/posts.routes');

// Utils
const { db } = require('./utils/database');

// Init express app
const app = express();

// Enable incoming JSON data
app.use(express.json());

// Endpoints
// http://localhost:4000/api/v1/users
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter);

db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err));

db.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

// Spin up server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
