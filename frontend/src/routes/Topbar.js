import React, { useEffect, useRef, useState } from "react";
import {
	HiFire,
	HiOutlineFire,
} from "react-icons/hi";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const TopBar = () => {
	const location = useLocation();
	const [selected, setSelected] = useState(1);
	const [profile, setProfile] = useState(false);
	const profileRef = useRef();
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
		}
	}, [location.pathname]);

	const onSelected = (num) => {
		window.scrollTo(0, 0);
		setSelected(num);
	};

	return (
		<>
			<div class="select-none pt-1 h-16 w-full flex flex-row border-r bg-gray-200 border-gray-200 justify-center fixed top-0 dark:text-white z-10 bg-barColor">
				<div class="flex flex-row justify-between w-4/5 max-w-2xl">
					{/* 기본 트윗 홈 */}
					<div class="mx-1 w-auto flex flex-row items-center">
						<Link
							to={"/bookmark"}
							onClick={() => onSelected(3)}
							class="p-3 rounded-full flex flex-row text-xl mb-2 hover:bg-gray-200 transition delay-50 duration-300"
						>
							{selected === 3 ? (
								<>
									<MdBookmark size={32}/>
								</>
							) : (
								<>
									<MdBookmarkBorder size={32}/>
								</>
							)}
						</Link>
					</div>
					<Link to="/home">
					<div
						class="mt-2 mb-3 mx-1 px-5 rounded-full text-white font-bold bg-black flex justify-center py-2 hover:bg-purple-600 transition delay-50 duration-300 cursor-pointer"
					>
						YON
					</div>
					</Link>
					<div class="mx-1 w-auto flex flex-row items-center">
						<Link
							to={"/popular"}
							onClick={() => onSelected(4)}
							class="p-3 rounded-full flex flex-row text-xl mb-2 hover:bg-gray-200 transition delay-50 duration-300"
						>
							{selected === 4 ? (
								<>
									<HiFire size={32}/>
								</>
							) : (
								<>
									<HiOutlineFire size={32}/>
								</>
							)}
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default TopBar;
