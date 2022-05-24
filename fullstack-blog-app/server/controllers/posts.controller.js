const { Op } = require('sequelize');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// Models
const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');
const { Comment } = require('../models/comment.model');
const { PostImg } = require('../models/postImg.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { storage } = require('../utils/firebase');

const getAllPosts = catchAsync(async (req, res, next) => {
  // SELECT * FROM post
  // WHERE post.status = 'active' AND comments.status = 'active'
  const posts = await Post.findAll({
    where: { status: 'active' },
    include: [
      { model: PostImg },
      { model: User, attributes: { exclude: ['password'] } },
      {
        model: Comment,
        required: false,
        where: { status: 'active' },
        include: [{ model: User, attributes: ['id', 'name'] }],
      },
    ],
  });

  console.log(posts.length);

  // Get all posts' imgs
  const postsPromises = posts.map(async post => {
    // Get imgs from firebase
    const postImgsPromises = post.postImgs.map(async postImg => {
      const imgRef = ref(storage, postImg.postImgUrl);
      const url = await getDownloadURL(imgRef);

      // Update postImgUrl prop
      postImg.postImgUrl = url;
      return postImg;
    });

    // Resolve pending promises
    const postImgsResolved = await Promise.all(postImgsPromises);
    post.postImgs = postImgsResolved;

    return post;
  });

  const postsResolved = await Promise.all(postsPromises);

  res.status(200).json({
    posts: postsResolved,
  });
});

const createPost = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;
  const { sessionUser } = req;

  const newPost = await Post.create({ title, content, userId: sessionUser.id });

  // Map through the files and upload them to firebase
  const postImgsPromises = req.files.map(async file => {
    // Create img ref
    const imgRef = ref(
      storage,
      `posts/${newPost.id}-${Date.now()}-${file.originalname}`
    );

    // Use uploadBytes
    const imgUploaded = await uploadBytes(imgRef, file.buffer);

    // Create a new postImg instance (PostImg.create)
    return await PostImg.create({
      postId: newPost.id,
      postImgUrl: imgUploaded.metadata.fullPath,
    });
  });

  // Resolve the pending promises
  await Promise.all(postImgsPromises);

  res.status(201).json({ status: 'success', newPost });
});

const getPostById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findOne({ where: { id } });

  res.status(200).json({
    post,
  });
});

const updatePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const post = await Post.findOne({ where: { id } });

  await post.update({ title, content });

  res.status(200).json({ status: 'success' });
});

const deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findOne({ where: { id } });

  await post.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
  });
});

const getUsersPosts = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const posts = await Post.findAll({
    where: { userId: id, status: 'active' },
    include: [{ model: User, attributes: { exclude: ['password'] } }],
  });

  res.status(200).json({ posts });
});

const getMyPosts = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const posts = await Post.findAll({
    where: { userId: sessionUser.id, status: 'active' },
    include: [
      {
        model: User,
        attributes: { exclude: ['password'] },
      },
    ],
  });

  res.status(200).json({ posts });
});

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  getUsersPosts,
  getMyPosts,
};
