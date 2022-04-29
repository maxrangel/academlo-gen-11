// Reducers
import userReducer from './slices/user.slice';
import transfersReducer from './slices/transfers.slice';

const rootReducer = {
	users: userReducer,
	trasnfers: transfersReducer,
};

export default rootReducer;
