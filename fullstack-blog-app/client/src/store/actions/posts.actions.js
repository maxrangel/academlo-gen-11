import axios from 'axios';

import { postsActions } from '../slices/posts.slice';

const API_URL = 'http://localhost:4000/api/v1/posts';

// const posts = [
// 	{
// 		id: 1,
// 		title: 'Post 1',
// 		content: 'Some description',
// 		date: '2022-05-12 18:30:21',
// 		user: { id: 1, name: 'Max' },
// 		comments: [
// 			{ id: 'c1', comment: 'Some comment' },
// 			{ id: 'c2', comment: 'Some comment' },
// 			{ id: 'c3', comment: 'Some comment' },
// 		],
// 	},
// 	{
// 		id: 2,
// 		title: 'Post 2',
// 		content: 'Some description',
// 		date: '2022-05-12 18:30:21',
// 		user: { id: 2, name: 'John' },
// 		comments: [
// 			{ id: 'c4', comment: 'Some comment' },
// 			{ id: 'c5', comment: 'Some comment' },
// 			{ id: 'c6', comment: 'Some comment' },
// 		],
// 	},
// 	{
// 		id: 3,
// 		title: 'Post 3',
// 		content: 'Some description',
// 		date: '2022-05-12 18:30:21',
// 		user: { id: 3, name: 'Joe' },
// 		comments: [
// 			{ id: 'c7', comment: 'Some comment' },
// 			{ id: 'c8', comment: 'Some comment' },
// 			{ id: 'c9', comment: 'Some comment' },
// 		],
// 	},
// ];

export const getPosts = () => {
	return async dispatch => {
		try {
			// API REQUEST
			const res = await axios.get(API_URL);

			const { posts } = res.data;

			dispatch(postsActions.getPosts({ posts }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const submitPost = (title, content) => {
	return async dispatch => {
		try {
			// API REQUEST
			const postData = { title, content, userId: 1 };

			const res = await axios.post(API_URL, postData);

			const { newPost } = res.data;

			dispatch(postsActions.newPost({ newPost }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const updatePost = (id, title, content) => {
	return async dispatch => {
		try {
			dispatch(postsActions.updatePost({ id, title, content }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const deletePost = id => {
	return async dispatch => {
		try {
			dispatch(postsActions.deletePost({ id }));
		} catch (error) {
			console.log(error);
		}
	};
};
