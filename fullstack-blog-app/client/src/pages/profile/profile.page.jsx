import { Row, Col } from 'antd';
import { useParams } from 'react-router-dom';

// Components
import PostsList from '../../components/posts/posts-list/post-list.component';
import AddPostForm from '../../components/forms/add-post-form/add-post-form.component';

import classes from './profile.module.css';

const Profile = () => {
	const params = useParams();

	if (+params.id !== 1) {
		return (
			<div className={classes.profile}>
				<h2>Max Profile</h2>
				<PostsList />
			</div>
		);
	}

	return (
		<div className={classes.profile}>
			<Row justify='space-around'>
				<Col span={6} xs={24} lg={10} pull={2}>
					<AddPostForm />
				</Col>
				<Col span={18} xs={24} lg={14}>
					<h2>Max Profile</h2>
					<PostsList />
				</Col>
			</Row>
		</div>
	);
};

export default Profile;
