const mongoose = require('mongoose');

const { app } = require('./app');

const MONGO_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cap4pkb.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

// Establish connection to MongoDB Atlas
mongoose.connect(MONGO_URL);

mongoose.connection.once('open', () => {
  console.log('Connection succesful');
});

// Spin up server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
