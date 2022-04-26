import { Row, Col } from 'antd';

// Components
import PostsList from '../../components/posts/posts-list/post-list.component';
import AddPostForm from '../../components/forms/add-post-form/add-post-form.component';

import classes from './home.module.css';

const Home = () => {
	return (
		<div className={classes.home}>
			<Row justify='space-around'>
				<Col span={6} xs={24} lg={8}>
					<AddPostForm />
				</Col>
				<Col span={18} xs={24} lg={16}>
					<PostsList />
				</Col>
			</Row>
		</div>
	);
};

export default Home;
