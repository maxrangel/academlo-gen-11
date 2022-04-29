import { useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Redux actions
import { signup } from '../../store/actions/user.actions';

// Component
import Input from '../../components/ui/input/input.component';
import Button from '../../components/ui/button/button.component';
import Form from '../../components/ui/form/form.component';

import classes from './signup.module.css';

const Signup = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Refs
	const nameInputRef = useRef();
	const passwordInputRef = useRef();

	const submitHandler = e => {
		e.preventDefault();
		navigate('/login');
	};

	const onLogin = () => {
		navigate('/login');
	};

	const header = 'To create an account, enter these fields';

	return (
		<div className={classes.container}>
			<Form header={header} submitHandler={submitHandler}>
				<Input
					ref={nameInputRef}
					label='Your name'
					input={{ id: 'name', type: 'text', placeholder: 'Your name' }}
				/>
				<Input
					ref={passwordInputRef}
					label='Password'
					input={{ id: 'password', type: 'password', placeholder: 'Password' }}
				/>

				<div className={classes.actions}>
					<Button type='submit'>Create account</Button>
					<Button onClick={onLogin} type='button'>
						Have an account? Log in
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default Signup;
