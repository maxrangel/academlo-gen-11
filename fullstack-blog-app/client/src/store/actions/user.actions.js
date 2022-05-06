import axios from 'axios';

import { usersActions } from '../slices/user.slice';

const API_URL = 'http://localhost:4000/api/v1/users';

export const login = (email, password) => {
	return async dispatch => {
		try {
			// API REQUEST
			const res = await axios.post(`${API_URL}/login`, { email, password });

			const { user, token } = res.data;

			localStorage.setItem('token', token);

			dispatch(usersActions.login({ user }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const signup = userData => {
	return async dispatch => {
		try {
			// API REQUEST
			const res = await axios.post(`${API_URL}`, { ...userData });

			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};
};

export const logout = () => {
	return async dispatch => {
		try {
			localStorage.removeItem('token');
			dispatch(usersActions.logout());
		} catch (error) {
			console.log(error);
		}
	};
};

export const checkToken = () => {
	return async dispatch => {
		try {
			const token = localStorage.getItem('token');
			const res = await axios.get(`${API_URL}/check-token`, {
				headers: { authorization: `Bearer ${token}` },
			});

			dispatch(usersActions.refreshUser({ user: res.data.user }));
		} catch (error) {
			dispatch(logout());
		}
	};
};
