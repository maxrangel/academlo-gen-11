import axios from 'axios';

import { postsActions } from '../slices/posts.slice';

const API_URL = 'http://localhost:4000/api/v1/posts';

export const getPosts = () => {
	return async dispatch => {
		try {
			// API REQUEST
			const token = localStorage.getItem('token');

			const res = await axios.get(API_URL, {
				headers: { authorization: `Bearer ${token}` },
			});

			const { posts } = res.data;

			dispatch(postsActions.getPosts({ posts }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const submitPost = (title, content, images, socket) => {
	return async dispatch => {
		try {
			// API REQUEST
			// const postData = { title, content };
			const postData = new FormData();

			postData.append('title', title);
			postData.append('content', content);

			// images.fileList.forEach(img => {
			// 	postData.append('postImgs', img);
			// });

			const token = localStorage.getItem('token');

			const res = await axios.post(API_URL, postData, {
				headers: { authorization: `Bearer ${token}` },
			});

			const { newPost, name } = res.data;

			const newPostData = { ...newPost, user: { name } };

			socket.emit('new-post', newPostData);

			dispatch(postsActions.newPost({ newPost: newPostData }));
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

export const getMyPosts = () => {
	return async dispatch => {
		try {
			const token = localStorage.getItem('token');

			const res = await axios.get(`${API_URL}/me`, {
				headers: { authorization: `Bearer ${token}` },
			});

			const { posts } = res.data;

			dispatch(postsActions.getPosts({ posts }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const getProfilePosts = userId => {
	return async dispatch => {
		try {
			const token = localStorage.getItem('token');

			const res = await axios.get(`${API_URL}/profile/${userId}`, {
				headers: { authorization: `Bearer ${token}` },
			});

			const { posts } = res.data;

			dispatch(postsActions.getPosts({ posts }));
		} catch (error) {
			console.log(error);
		}
	};
};
