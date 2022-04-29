import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuth: false,
	user: null,
	error: null,
};

const userSlice = createSlice({
	initialState,
	name: 'users',
	reducers: {
		login(state, action) {
			state.isAuth = true;
		},
		logout(state) {
			state.isAuth = false;
			state.user = null;
		},
	},
});

export const usersActions = userSlice.actions;
export default userSlice.reducer;
