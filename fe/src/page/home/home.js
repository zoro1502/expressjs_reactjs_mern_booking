import React, { useEffect, useState } from "react";
import { CarouselImg } from "../../components/common/carosel";
import { RoomList } from "../../components/room-service/roomList";
import { ServiceList } from "../../components/room-service/serviceList";
import { ServiceHotelService } from "../../services/feService/serviceHotel";
import { BlogList } from "../../components/blog/blogList";
import { RoomService } from "../../services/feService/roomService";
import { ArticleService } from "../../services/feService/articleService";
import { defaultA, defaultB } from "../../common/constant";
import { WelCome } from "./welcome";

const carouselImg = [
	{
		_id: 1,
		avatar: defaultA,
		title: 'Welcome To Haan',
		content: 'Resort & Golf',
		class: ''
	},
	{
		_id: 2,
		avatar: defaultB,
		title: 'Welcome To Haan',
		content: 'Resort & Golf',
		class: ''
	},
]

const Home = () => {
	document.title = 'HAAN Resort & Golf';
	//const [rooms, setRooms] = useState([]);
	const [service, setService] = useState([]);
	const [article, setArticle] = useState([]);
	useEffect(() => {
		//getRooms();
		getService();
		getArticles();
	}, []);

	// const getRooms = async () => {
	// 	const rs = await RoomService.getDataList({ page: 1, page_size: 6, status: 1 });
	// 	if (rs?.status === 200) {
	// 		setRooms(rs?.data?.rooms || [])
	// 	} else {
	// 		setRooms([]);
	// 	}
	// };

	const getService = async () => {
		const rs = await ServiceHotelService.getDataList({ page: 1, page_size: 6 });
		if (rs?.status === 200) {
			setService(rs?.data?.services || [])
		} else {
			setService([]);
		}
	};

	const getArticles = async () => {
		const rs = await ArticleService.getDataList({ page: 1, page_size: 4, status: 1 });
		if (rs?.status === 200) {
			setArticle(rs?.data?.articles || [])
		} else {
			setArticle([]);
		}
	};

	return (
		<React.Fragment>
			<CarouselImg data={carouselImg} />
			<WelCome/>
			{/* <RoomList data={rooms} isShowLink={true} size={3} /> */}
			<ServiceList data={service} isShowLink={true} size={3} />
			{
				article && <BlogList title={'Tin tức Và Tuyển Dụng'} data={article} isShowLink={true} />
			}
		</React.Fragment>
	);
};

export default Home;


