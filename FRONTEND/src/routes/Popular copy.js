import LoadingBox from "components/box/LoadingBox";
import JweetBox from "components/box/YONBox";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "mybase";
import React, { useEffect, useState } from "react";
import { HiFire } from "react-icons/hi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import YONBoxSlider from "components/box/YONBoxSlider";

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'

const Popular = () => {
	const [loading, setLoading] = useState(false);
	const [filteredJweets, setFilteredJweets] = useState([]);

	useEffect(() => {
		onSnapshot(
			query(collection(db, "jweets"), orderBy("createdAt", "desc")),
			async (snapshot) => {
				const myJweetArray = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				await myJweetArray.sort(function (a, b) {
					return b.voteCount - a.voteCount;
				});
				setFilteredJweets(myJweetArray);
				setLoading(true);
			}
		);
	}, []);

	useEffect(() => {
		return () => setLoading(false); // cleanup function을 이용
	}, []);
	return (
		<div class="flex flex-row w-full justify-center">
			<div class="flex flex-col pt-16 max-w-4xl">
			<Swiper
					slidesPerView="1"
					mousewheel={true}
					direction="vertical"
					modules={[Pagination]}
					pagination={{ clickable: true }}
				>
					<div>
						{filteredJweets.length !== 0 ? (
							filteredJweets.map((jweet, index) => {
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

export default Popular;
