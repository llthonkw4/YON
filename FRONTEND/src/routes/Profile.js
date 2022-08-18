import LoadingBox from "components/box/LoadingBox";
import MenuButton from "components/button/MenuButton";
import LikeJweets from "components/container/LikeJweets";
import MyJweets from "components/container/MyJweets";
import ReJweets from "components/container/ReJweets";
import UpdateProfileModal from "components/modal/UpdateProfileModal";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "mybase";
import React, { useCallback, useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
const Profile = ({ match }) => {
	const uid = match.params.id;
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const history = useHistory();
	const [info, setInfo] = useState({});
	const [myJweets, setMyJweets] = useState([]);
	const [updateState, setUpdateState] = useState(false);
	const toggleUpdateState = () => setUpdateState(!updateState);
	const currentUser = useSelector((state) => state.user.currentUser);
	const [selected, setSelected] = useState(1);
	const onSelected = (num) => {
		setSelected(num);
	};
	useEffect(() => {
		return () => setLoading(false); // cleanup function을 이용
	}, []);
	const [updateModal, setUpdateModal] = useState(false);
	const updateModalOpen = () => setUpdateModal(true);
	const updateModalClose = () => {
		setUpdateModal(false);
	};

	const getInfo = useCallback(async () => {
		await onSnapshot(doc(db, "users", uid), (doc) => {
			setInfo(doc.data());
			setLoading(true);
		});
	}, [uid]);

	useEffect(() => {
		if (location.pathname.includes("/jweet")) {
			setSelected(1);
		} else if (location.pathname.includes("/like")) {
			setSelected(2);
		} else if (location.pathname.includes("/rejweet")) {
			setSelected(3);
		}
	}, [location.pathname]);

	const getJweets = useCallback(async () => {
		const q = query(collection(db, "jweets"), where("creatorId", "==", uid));
		onSnapshot(q, (querySnapshot) => {
			const cp = [];
			querySnapshot.forEach((doc) => {
				cp.push(doc.data());
			});
			setMyJweets(cp);
		});
	}, [uid]);

	useEffect(() => {
		getInfo();
		getJweets();
	}, [getInfo, getJweets, updateState]);

	return (
		<div class="flex flex-row w-full justify-center">
			{loading ? (
				<>
					<div class="flex-1 flex flex-col pt-16 max-w-xl">
						<div class="h-16 w-full px-2 py-2 flex flex-row items-center border-b border-gray-200">
							<div
								onClick={() => history.goBack()}
								class="mr-4 cursor-pointer p-2 rounded-full hover:bg-gray-200 transition delay-50 duration-300"
							>
								<IoArrowBackOutline size={20} />
							</div>
							<div class="flex flex-col">
								<div class="font-bold text-xl">{info.displayName}</div>
								<div>{myJweets.length} Questions</div>
							</div>
						</div>
						<div class="w-full flex flex-col relative">
							<div class="h-20 w-full ">

							</div>
							{uid === currentUser.uid ? (
								<div class="h-16 w-full flex flex-row-reverse items-center pr-4">
									
								</div>
							) : (
								<div class="h-16 w-full flex flex-row-reverse items-center pr-4">
									<div class="cursor-pointer font-bold text-base rounded-full flex justify-center items-center px-4 py-2 "></div>
								</div>
							)}
							<div class="absolute w-32 h-32 left-4 bottom-2">
								<div class="border-4 border-white rounded-full bg-white">
									<img
										src={info.photoURL}
										class="w-full h-32 object-cover rounded-full"
										alt="img"
									/>
								</div>
							</div>
						</div>
						
						<div class="w-full flex flex-col pl-4 pr-4 mb-4">

							<div class="flex flex-row">
								<div class="w-1/2">
									<h1 class="font-bold text-xl">{info.displayName}</h1>
									<p class="text-gray-400 mb-2">@{info.email.split("@")[0]}</p>
								</div>
								<div class="w-1/2">
									
								</div>
							</div>

						</div>
						<div class="w-full flex flex-row border-t border-gray-200 place-content-center">
							<MenuButton
								url={"/profile/yon/" + uid}
								onSelected={onSelected}
								selected={selected}
								num={1}
								width={"w-1/2"}	
								text={"Questions"}
							/>
							
						</div>
							<Route path="/profile/yon/:id" component={MyJweets} />
					</div>
				</>
			) : (
				<LoadingBox />
			)}
		</div>
	);
};

export default Profile;
