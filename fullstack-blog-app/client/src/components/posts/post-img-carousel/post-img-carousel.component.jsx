import { Carousel, Image } from 'antd';

import defaultImg1 from '../../../assets/imgs/default-1.jpg';
import defaultImg2 from '../../../assets/imgs/default-2.jpg';
import defaultImg3 from '../../../assets/imgs/default-3.jpg';

import classes from './post-img-carousel.module.css';

const dummyImages = [
	{ title: 'Default 1', src: defaultImg1 },
	{ title: 'Default 2', src: defaultImg2 },
	{ title: 'Default 3', src: defaultImg3 },
];

const PostImgCarousel = ({ images }) => {
	return (
		<Carousel dots={{ className: classes['carousel__dots'] }}>
			{dummyImages.map(img => (
				<Image
          key={img.title}
					preview={false}
					width={600}
					height={400}
					src={img.src}
					alt={img.title}
				/>
			))}
		</Carousel>
	);
};

export default PostImgCarousel;
