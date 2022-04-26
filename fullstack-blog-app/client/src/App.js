import { Routes, Route } from 'react-router-dom';

// Components
import Header from './components/ui/header/header.component';

// Pages
import Home from './pages/home/home.page';
import Auth from './pages/auth/auth.page';
import Profile from './pages/profile/profile.page';
import PostDetails from './pages/post-details/post-details.page';

import './App.css';

const App = () => {
	return (
		<div className=''>
			<Header />

			<Routes>
				<Route index path='/' element={<Home />} />
				<Route path='/auth' element={<Auth />} />
				<Route path='/profile/:id' element={<Profile />} />
				<Route path='/post-details/:id' element={<PostDetails />} />
			</Routes>
		</div>
	);
};

export default App;
