import { Link } from 'react-router-dom';
import classes from './header.module.css';

const Header = () => {
	return (
		<header className={classes.header}>
			<div className={classes.brand}>
				<a href="/">Academlo Bank</a>
			</div>

			<nav className={classes.navigation}>
				<ul>
					<li>
						<Link to="/login">Change account</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
