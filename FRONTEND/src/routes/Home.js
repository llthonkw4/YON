import CreateJweetBox from "components/box/CreateJweetBox";
import JweetBox from "components/box/JweetBox";
import LoadingBox from "components/box/LoadingBox";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "mybase";
import React, { useEffect, useState } from "react";
import { MdSettings } from "react-icons/md";

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
		<div class="flex-1 flex flex-col px-64 pt-16">
			<div class="pb-20">
				{jweets.length !== 0 ? (
					jweets.map((jweet, index) => {
						return <JweetBox key={jweet.id} jweet={jweet} id={jweet.id} />;
					})
				) : loading ? (
					<div class="w-full flex-1 flex justify-center items-center mt-8">
						등록된 Jweet이 없습니다.
					</div>
				) : (
					<LoadingBox />
				)}
			</div>
		</div>
	);
};

export default Home;
