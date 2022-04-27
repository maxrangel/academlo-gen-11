const express = require('express');

// Controller
const {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/posts.controller');

const router = express.Router();

router.get('/', getAllPosts);

router.post('/', createPost);

router.route('/:id').get(getPostById).patch(updatePost).delete(deletePost);

module.exports = { postsRouter: router };
