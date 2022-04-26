import axios from 'axios';

import { postsActions } from '../slices/posts.slice';

const API_URL = '';

export const submitComment = (postId, comment) => {
	return async dispatch => {
		try {
			// API REQUEST
			const newComment = {
				id: Math.floor(Math.random() * 1000),
				comment,
			};
			dispatch(postsActions.newComment({ postId, newComment }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const deleteComment = (postId, commentId) => {
	return async dispatch => {
		try {
			dispatch(postsActions.deleteComment({ postId, commentId }));
		} catch (error) {
			console.log(error);
		}
	};
};
