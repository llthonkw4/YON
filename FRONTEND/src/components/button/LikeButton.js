import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "mybase";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const LikeButton = ({ jweet, likeRef, isMain }) => {
	const currentUser = useSelector((state) => state.user.currentUser);
	const [like, setLike] = useState(false);
	const [likeSnack, setLikeSnack] = useState();
	const likeClick = () => setLikeSnack(true);
	const likeClose = (e, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setLikeSnack(false);
	};
	useEffect(() => {
		setLike(jweet.like.includes(currentUser.uid));
	}, [currentUser.uid, jweet.like]);

	const toggleLike = async () => {
		likeClick();
		if (jweet.like.includes(currentUser.uid)) {
			setLike(false);
			const cp = [...jweet.like];
			cp.splice(jweet.like.indexOf(currentUser.uid), 1);
			await updateDoc(doc(db, "jweets", jweet.id), {
				like: cp,
			});
		} else {
			setLike(true);
			const cp = [...jweet.like];
			cp.push(currentUser.uid);
			await updateDoc(doc(db, "jweets", jweet.id), {
				like: cp,
			});
		}
	};
	return (
		<>
			<div
				id="except"
				class={
					"mb-1 w-1/4 flex flex-row items-center transition delay-50 duration-300 hover:text-red-500 " +
					(like ? "text-red-500 " : "text-black ")
				}
			>
				<div
					id="except"
					onClick={toggleLike}
					ref={likeRef}
					class={
						"cursor-pointer rounded-full transition delay-50 duration-300 hover:bg-red-100 p-2 "
					}
				>
					{like ? (
						<AiTwotoneHeart size={isMain? 44 : 16} />
					) : (
						<AiOutlineHeart size={isMain? 44 : 16} />
					)}
				</div>
				{!isMain && (
					<p id="except" class="-ml-1 text-2xl flex flex-row items-center">
						{jweet.like.length}
					</p>
				)}
			</div>
			<Snackbar open={likeSnack} autoHideDuration={2000} onClose={likeClose}>
				<Alert
					onClose={likeClose}
					severity="success"
					color="error"
					variant="filled"
					sx={{ width: "100%" }}
				>
					{like ? "?????????!" : "????????? ??????!"}
				</Alert>
			</Snackbar>
		</>
	);
};

export default LikeButton;
