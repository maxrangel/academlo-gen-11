const { Server } = require('socket.io');
const { app } = require('./app');

// Models
const { initModels } = require('./models/initModels');

// Utils
const { db } = require('./utils/database');

// Authenticate database credentials
db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err));

// Establish models relations
initModels();

// Sync sequelize models
db.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

// Spin up server
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});

// Init socket.io server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  socket.on('new-post', newPostData => {
    socket.broadcast.emit('render-new-post', newPostData);
  });
});
