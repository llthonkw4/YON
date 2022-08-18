import YONBoxSlider from "components/box/YONBoxSlider";
import LoadingBox from "components/box/LoadingBox";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "mybase";
import React, { useEffect, useState } from "react";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'



const Home = () => {
	const [loading, setLoading] = useState(false);
	const [jweets, setJweets] = useState([]);
	useEffect(() => {
		onSnapshot(
			query(collection(db, "jweets"), orderBy("createdAt", "desc")),
			(snapshot) => {
				const nweetArray = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setJweets(nweetArray);
				setLoading(true);
			}
		);
	}, []);
	useEffect(() => {
		return () => setLoading(false); // cleanup function을 이용
	}, []);
	return (
		<div class="flex flex-row w-full justify-center">
			<div class="flex flex-col pt-16 pb-20 max-w-4xl">
				<Swiper
					slidesPerView="1"
					mousewheel={true}
					direction="vertical"
					modules={[Pagination]}
					pagination={{ clickable: true }}
				>
					<div>
						{jweets.length !== 0 ? (
							jweets.map((jweet, index) => {
								return <SwiperSlide><YONBoxSlider key={jweet.id} jweet={jweet} id={jweet.id} /></SwiperSlide>;
							})
						) : loading ? (
							<div class="w-full flex-1 flex justify-center items-center mt-8">
								등록된 Jweet이 없습니다.
							</div>
						) : (
							<LoadingBox />
						)}
					</div>
				</Swiper>
			</div>
		</div>
	);
};

export default Home;
