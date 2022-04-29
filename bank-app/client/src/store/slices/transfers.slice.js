import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	transfers: [],
	error: null,
};

const transfersSlice = createSlice({
	initialState,
	name: 'transfers',
	reducers: {
		getTransfers(state, action) {
			state.transfers = action.payload.transfers;
		},
		newTransfer(state, action) {
			const updatedTransfers = state.transfers.concat(
				action.payload.newTransfer
			);

			state.transfers = updatedTransfers;
		},
	},
});

export const transfersActions = transfersSlice.actions;
export default transfersSlice.reducer;
