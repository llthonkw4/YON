import JweetBox from "components/box/YONBox";
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { db } from "mybase";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingBox from "components/box/LoadingBox";

const MyJweets = ({ match }) => {
	const uid = match.params.id;
	const currentUser = useSelector((state) => state.user.currentUser);
	const [myJweets, setMyJweets] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		return () => setLoading(false); // cleanup function을 이용
	}, []);
	useEffect(() => {
		const q = query(
			collection(db, "jweets"),
			orderBy("createdAt", "desc"),
			where("creatorId", "==", uid)
		);
		onSnapshot(q, (querySnapshot) => {
			const cp = [];
			querySnapshot.forEach((doc) => {
				cp.push({
					id: doc.id,
					...doc.data(),
				});
			});
			setMyJweets(cp);
			setLoading(true);
		});
	}, [uid]);

	return (
		<div class="pt-3 pb-20 border-t">
			{myJweets.length !== 0 ? (
				myJweets.map((jweet, index) => {
					return (
						<JweetBox
							key={jweet.id}
							jweet={jweet}
							id={jweet.id}
							isOwner={jweet.creatorId === currentUser.uid}
						/>
					);
				})
			) : (
				<div class="flex flex-col justify-center items-center mt-16">
					<div class="w-2/3 font-bold text-2xl">
						You don’t have any YoN yet
					</div>
					<div class="w-2/3 text-gray-500">
						Write a YoN. When you do, it’ll show up here.
					</div>
				</div>
			) }
		</div>
	);
};

export default MyJweets;
