import CreateJweetModal from "components/modal/CreateJweetModal";
import React, { useEffect, useRef, useState } from "react";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const BottomBar = () => {
	const location = useLocation();
	const [selected, setSelected] = useState(1);
	const currentUser = useSelector((state) => state.user.currentUser);
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
	const profileRef = useRef();
	const discardCheck = () => {
		handleCheckOpen();
	};
	const discardThread = () => {
		handleCreateClose();
		handleCheckClose();
	};
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
		} else if (location.pathname.includes("profile")) {
			setSelected(5);
		}
	}, [location.pathname]);

	const onSelected = (num) => {
		window.scrollTo(0, 0);
		setSelected(num);
	};

	return (
		<>
			<div class="select-none h-66 w-full flex flex-row border-r bg-gray-200 border-gray-200 justify-center fixed bottom-0 dark:text-white z-10">
				<div class="flex flex-row justify-between w-4/5 max-w-2xl">
					{/* 기본 트윗 홈 */}
					<div class="mx-1 w-auto flex flex-row items-center">
						<Link
							to="/"
							onClick={() => onSelected(1)}
							class="p-3 rounded-full flex flex-row text-xl mb-2 hover:bg-gray-200 transition delay-50 duration-300"
						>
							{selected === 1 ? (
								<>
									{" "}
									<AiFillHome size={32}/>
								</>
							) : (
								<>
									<AiOutlineHome size={32}/>
								</>
							)}
						</Link>
					</div>
					<div
						onClick={handleCreateOpen}
						class="mt-2 mb-3 mx-1 px-5 rounded-full text-white font-bold bg-black flex justify-center py-3 hover:bg-black transition delay-50 duration-300 cursor-pointer"
					>
						+
					</div>
					<div class="mx-1 w-auto flex flex-row items-center">
						<Link
							to={"/profile/yon/" + currentUser.uid}
							onClick={() => onSelected(5)}
							class="p-3 rounded-full flex flex-row text-xl mb-4 hover:bg-gray-200 transition delay-50 duration-300"
						>
							{selected === 5 ? (
								<>
									<BsPersonFill size={32}/>
								</>
							) : (
								<>
									<BsPerson size={32}/>
								</>
							)}
						</Link>
					</div>
				</div>
			</div>
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

export default BottomBar;
