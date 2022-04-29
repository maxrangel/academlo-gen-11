import { forwardRef } from 'react';
import classes from './input.module.css';

const Input = forwardRef(({ label, input }, ref) => {
	return (
		<div className={classes.input}>
			<label htmlFor={input.id}>{label}</label>
			<input ref={ref} {...input} />
		</div>
	);
});

export default Input;
