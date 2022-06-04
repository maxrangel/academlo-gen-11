const mongoose = require('mongoose');

const { app } = require('./app');

// Establish connection to MongoDB Atlas
mongoose.connect(
  'mongodb+srv://maxrngl:pass1234@cluster0.cap4pkb.mongodb.net/mongo-example?retryWrites=true&w=majority'
);

mongoose.connection.once('open', () => {
  console.log('Connection succesful');
});

// Spin up server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
