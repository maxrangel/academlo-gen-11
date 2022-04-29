import classes from './button.module.css';

const Button = ({ onClick, type, children }) => {
	return (
		<button onClick={onClick} type={type || 'submit'} className={classes.btn}>
			{children}
		</button>
	);
};

export default Button;
