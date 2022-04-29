import { Route, Routes } from 'react-router-dom';

// Pages
import Home from './pages/home/home.page';
import Login from './pages/login/login.page';
import Signup from './pages/signup/signup.page';

// Components
import Header from './components/ui/header/header.component';

import './App.css';

const App = () => {
	return (
		<div>
			<Header />

			<Routes>
				<Route index path="/" element={<Home />} />
				<Route index path="/login" element={<Login />} />
				<Route index path="/signup" element={<Signup />} />
			</Routes>
		</div>
	);
};

export default App;
