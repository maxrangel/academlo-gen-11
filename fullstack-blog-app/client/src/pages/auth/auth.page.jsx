import { useState } from 'react';
// Components
import Login from '../../components/auth/login/login.component';
import Signup from '../../components/auth/signup/signup.component';

const Auth = () => {
	const [showLoginForm, setShowLoginForm] = useState(true);

	const showLoginHandler = () => {
		setShowLoginForm(true);
	};

	const hideLoginHandler = () => {
		setShowLoginForm(false);
	};

	return (
		<div>
			{showLoginForm ? (
				<Login onHideLogin={hideLoginHandler} />
			) : (
				<Signup onShowLogin={showLoginHandler} />
			)}
		</div>
	);
};

export default Auth;
