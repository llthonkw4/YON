import Modal from "@mui/material/Modal";
import CreateJweetModal from "components/modal/CreateJweetModal";
import defaultImg from "image/defaultImg.jpg";
import logo from "image/logo.png";
import { auth } from "mybase";
import React, { useEffect, useRef, useState } from "react";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import {
	HiFire,
	HiHashtag,
	HiOutlineDotsHorizontal,
	HiOutlineFire,
	HiOutlineHashtag,
} from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setLoginToken } from "reducers/user";
const Leftbar = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const location = useLocation();
	const [selected, setSelected] = useState(1);
	const currentUser = useSelector((state) => state.user.currentUser);
	const [photoURL, setPhotoURL] = useState(currentUser.photoURL);
	useEffect(() => {
		setPhotoURL(currentUser.photoURL);
	}, [currentUser.photoURL]);
	const history = useHistory();
	// 프로필 모달
	const [logoutOpen, setLogoutOpen] = useState(false);
	const handleLogoutOpen = () => setLogoutOpen(true);
	const handleLogoutClose = () => setLogoutOpen(false);

	// jweet 모달
	const [createOpen, setCreateOpen] = useState(false);
	const handleCreateOpen = () => setCreateOpen(true);
	const handleCreateClose = () => {
		setCreateOpen(false);
	};

	const [checkOpen, setCheckOpen] = useState(false);
	const handleCheckOpen = () => setCheckOpen(true);
	const handleCheckClose = () => {
		setCheckOpen(false);
	};

	const [profile, setProfile] = useState(false);
	const toggleProfile = () => setProfile(!profile);
	const profileRef = useRef();

	const discardCheck = () => {
		handleCheckOpen();
	};

	const discardThread = () => {
		handleCreateClose();
		handleCheckClose();
	};
	useEffect(() => {
		return () => setLoading(false); // cleanup function을 이용
	}, []);
	useEffect(() => {
		if (!profile) return;
		function handleClick(e) {
			if (profileRef.current === null) {
				return;
			} else if (!profileRef.current.contains(e.target)) {
				setProfile(false);
			}
		}
		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [profile]);

	useEffect(() => {
		if (location.pathname.includes("explore")) {
			setSelected(2);
		} else if (location.pathname.includes("bookmark")) {
			setSelected(3);
		} else if (location.pathname.includes("popular")) {
			setSelected(4);
		} else if (location.pathname.includes("profile")) {
			setSelected(5);
		} else {
			setSelected(1);
		}
	}, [location.pathname]);

	const onLogOutClick = () => {
		auth.signOut();
		sessionStorage.setItem("loginToken", false);
		dispatch(setLoginToken("logout"));
		dispatch(
			setCurrentUser({
				photoURL: "",
				uid: "",
				displayName: "",
				email: "",
				description: "",
				bookmark: [],
				follower: [],
				following: [],
				rejweet: [],
				bgURL: "",
			})
		);
		history.push("/");
	};

	const onSelected = (num) => {
		window.scrollTo(0, 0);
		setSelected(num);
	};

	return (
		<>
			<div class="select-none h-66 pt-4 pr-4 w-full flex flex-row border-r border-gray-200 justify-between fixed bottom-0 dark:text-white z-10 bg-white">
				<div class="flex flex-row">
					<div class="flex flex-row justify-between items-center">
						<Link class="h-16 mb-4" to="/" onClick={() => setSelected(1)}>
							<img
								src={logo}
								// onClick={() => history.push("/home")}
								class="h-full px-4 py-3 object-cover hover:bg-purple-200 hover:dark:bg-none rounded-full cursor-pointer transition delay-50 duration-300 "
								alt="logo"
							/>
						</Link>
						{/* <Switch
							checked={isDark}
							onChange={toggleMode}
							aria-label="Switch demo"
							color={"warning"}
						/> */}
					</div>
					<div class="flex flex-row w-full ">
						{/* 기본 트윗 홈 */}
						<div class="w-auto flex flex-row items-center">
							<Link
								to="/"
								onClick={() => onSelected(1)}
								class="pl-3 pr-5 py-3 rounded-full flex flex-row text-xl mb-2 hover:bg-gray-200 transition delay-50 duration-300"
							>
								{selected === 1 ? (
									<>
										{" "}
										<AiFillHome size={32} class="mr-4" />
									</>
								) : (
									<>
										<AiOutlineHome size={32} class="mr-4" />
									</>
								)}
							</Link>
						</div>

						<div class="w-auto flex flex-row items-center">
							<Link
								to={"/explore/jweets"}
								onClick={() => onSelected(2)}
								class="pl-3 pr-5 py-3 rounded-full flex flex-row text-xl mb-2 hover:bg-gray-200 transition delay-50 duration-300"
							>
								{selected === 2 ? (
									<>
										<HiHashtag size={32} class="mr-4" />
									</>
								) : (
									<>
										<HiOutlineHashtag size={32} class="mr-4" />
									</>
								)}
							</Link>
						</div>
						<div class="w-auto flex flex-row items-center">
							<Link
								to={"/bookmark"}
								onClick={() => onSelected(3)}
								class="pl-3 pr-5 py-3 rounded-full flex flex-row text-xl mb-2 hover:bg-gray-200 transition delay-50 duration-300"
							>
								{selected === 3 ? (
									<>
										<MdBookmark size={32} class="mr-4" />
									</>
								) : (
									<>
										<MdBookmarkBorder size={32} class="mr-4" />
									</>
								)}
							</Link>
						</div>
						<div class="w-auto flex flex-row items-center">
							<Link
								to={"/popular"}
								onClick={() => onSelected(4)}
								class="pl-3 pr-5 py-3 rounded-full flex flex-row text-xl mb-2 hover:bg-gray-200 transition delay-50 duration-300"
							>
								{selected === 4 ? (
									<>
										<HiFire size={32} class="mr-4" />
									</>
								) : (
									<>
										<HiOutlineFire size={32} class="mr-4" />
									</>
								)}
							</Link>
						</div>
						<div class="w-auto flex flex-row items-center">
							<Link
								to={"/profile/jweet/" + currentUser.uid}
								onClick={() => onSelected(5)}
								class="pl-3 pr-5 py-3 rounded-full flex flex-row text-xl mb-4 hover:bg-gray-200 transition delay-50 duration-300"
							>
								{selected === 5 ? (
									<>
										<BsPersonFill size={32} class="mr-4" />
									</>
								) : (
									<>
										<BsPerson size={32} class="mr-4" />
									</>
								)}
							</Link>
						</div>

						<div class="w-full border-b border-gray-200 mb-2"></div>
						<div class="cursor-pointer w-auto flex flex-row items-center">
							<div class="pl-3 pr-5 py-3 rounded-full flex flex-row text-xl mb-2 hover:bg-gray-200 transition delay-50 duration-300">
								<IoNotificationsOutline size={32} class="mr-4" />
							</div>
						</div>
						<div class="relative cursor-pointer w-auto flex flex-row items-center">
							<div class=" pl-3 pr-5 py-3 rounded-full flex flex-row text-xl mb-2 hover:bg-gray-200 transition delay-50 duration-300">
								<CgMoreO size={32} class="mr-4" />
							</div>
						</div>
						<div
							onClick={handleCreateOpen}
							class="w-full rounded-full text-white font-bold bg-purple-400 flex justify-center py-3 hover:bg-purple-600 transition delay-50 duration-300 cursor-pointer"
						>
							Jweet
						</div>
					</div>
				</div>
			</div>
			<Modal
				open={logoutOpen}
				onClose={handleLogoutClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div class="outline-none absolute border border-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 origin-center w-96 h-auto p-8 bg-white rounded-2xl flex flex-col justify-start items-start">
					<div class="w-full h-12 flex justify-center items-center mb-4">
						<img src={logo} class="h-full object-cover" alt="logo" />
					</div>
					<h1 class="text-xl font-bold mb-2">Log out of Jwitter?</h1>
					<p class="text-left pb-8">
						You can always log back in at any time. If you just want to switch
						accounts, you can do that by adding an existing account.{" "}
					</p>
					<div
						onClick={onLogOutClick}
						class="cursor-pointer w-full flex py-3 justify-center items-center rounded-full bg-purple-300 text-white font-bold mb-4"
					>
						Log out
					</div>
					<div
						onClick={handleLogoutClose}
						class="cursor-pointer w-full flex py-3 justify-center items-center rounded-full border border-purple-300 text-purple-500 font-bold"
					>
						Cancel
					</div>
				</div>
			</Modal>
			<CreateJweetModal
				createOpen={createOpen}
				discardCheck={discardCheck}
				handleCreateClose={handleCreateClose}
				checkOpen={checkOpen}
				handleCheckClose={handleCheckClose}
				discardThread={discardThread}
			/>
		</>
	);
};

export default Leftbar;
