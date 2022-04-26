import { Link } from 'react-router-dom';

import Button from '../button/button.component';

import classes from './header.module.css';

const Header = () => {
	return (
		<header className={classes.header}>
			<div className={classes.brand}>
				<Link to='/'>Academlo Blog</Link>
			</div>

			<nav className={classes.navigation}>
				{/* TODO: SET USER ID */}
				<Link className={classes['navigation__link']} to='/profile/1'>
					Profile
				</Link>
				<Link className={classes['navigation__link']} to='/auth'>
					Logout
				</Link>
			</nav>
		</header>
	);
};

export default Header;
