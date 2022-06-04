const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'client',
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  hobbies: [String],
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
