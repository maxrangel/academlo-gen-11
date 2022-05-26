const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// require('crypto').randomBytes(64).toString('hex')

// Models
const { User } = require('../models/user.model');
const { Post } = require('../models/post.model');
const { Comment } = require('../models/comment.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { storage } = require('../utils/firebase');
const { Email } = require('../utils/email');

dotenv.config({ path: './config.env' });

const getAllUsers = catchAsync(async (req, res, next) => {
  // SELECT * FROM users;
  // Include the posts that each user has created
  // Include the comments that each user has created
  // Include the post in which the comment was made
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    include: [
      { model: Post },
      {
        model: Comment,
        include: [{ model: Post }],
      },
    ],
  });

  // Map async: you will use this techinque everytime that you need some async operations inside of an array
  const usersPromises = users.map(async user => {
    // Create firebase img ref and get the full path
    const imgRef = ref(storage, user.profileImgUrl);
    const url = await getDownloadURL(imgRef);

    // Update the user's profileImgUrl property
    user.profileImgUrl = url;
    return user;
  });

  // Resolve every promise that map gave us ([ Promise { <pending> }, Promise { <pending> } ])
  const usersResolved = await Promise.all(usersPromises);

  res.status(200).json({
    users: usersResolved,
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const imgRef = ref(storage, `users/${Date.now()}-${req.file.originalname}`);
  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  // INSERT INTO ...
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    role,
    profileImgUrl: imgUploaded.metadata.fullPath,
  });

  await new Email(newUser.email).sendWelcome(newUser.name);

  // Remove password from response
  newUser.password = undefined;

  res.status(201).json({ status: 'success', newUser });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  // Get url from firebase
  const imgRef = ref(storage, user.profileImgUrl);
  const url = await getDownloadURL(imgRef);

  user.profileImgUrl = url;

  res.status(200).json({
    user,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  // const { id } = req.params;
  const { name } = req.body;

  // await User.update({ name }, { where: { id } });

  // const user = await User.findOne({ where: { id } });

  await user.update({ name });

  res.status(200).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  // const { id } = req.params;

  // DELETE FROM ...
  // await user.destroy();
  await user.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate that user exists with given email
  const user = await User.findOne({
    where: { email, status: 'active' },
  });

  // Compare password with db
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid credentials', 400));
  }

  // Generate JWT
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;

  res.status(200).json({ token, user });
});

const checkToken = catchAsync(async (req, res, next) => {
  res.status(200).json({ user: req.sessionUser });
});

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  checkToken,
};
