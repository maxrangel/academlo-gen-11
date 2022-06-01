import { Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

// Redux actions
import { checkToken } from '../../store/actions/user.actions';

// Components
import PostsList from '../../components/posts/posts-list/post-list.component';
import AddPostForm from '../../components/forms/add-post-form/add-post-form.component';

import classes from './home.module.css';

const Home = () => {
	// State
	const [socket, setSocket] = useState(null);

	// Check if user is authenticated from state
	const isAuth = useSelector(state => state.user.isAuth);
	const posts = useSelector(state => state.posts.posts);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const newSocket = io('http://localhost:4000');
		setSocket(newSocket);

		return () => newSocket.close();
	}, []);

	useEffect(() => {
		if (!isAuth) navigate('/auth');
		else dispatch(checkToken());
	}, [navigate, isAuth, dispatch]);

	return (
		<div className={classes.home}>
			<Row justify='space-around'>
				<Col span={6} xs={24} lg={8}>
					<AddPostForm socket={socket} />
				</Col>
				<Col span={18} xs={24} lg={16}>
					<PostsList socket={socket} postsList={posts} />
				</Col>
			</Row>
		</div>
	);
};

export default Home;
