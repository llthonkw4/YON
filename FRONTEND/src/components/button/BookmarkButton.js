import MuiAlert from "@mui/material/Alert";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import Snackbar from "@mui/material/Snackbar";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "mybase";
import React, { useEffect, useState } from "react";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
// import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "reducers/user";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BookmarkButton = ({ jweet, bookmarkRef, isMain }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user.currentUser);
	const [bookmark, setBookmark] = useState(false);

	// Snack bar
	const [bookmarkSnack, setBookmarkSnack] = useState();
	const bookmarkClick = () => setBookmarkSnack(true);
	const bookmarkClose = (e, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setBookmarkSnack(false);
	};

	useEffect(() => {
		setBookmark(currentUser.bookmark.includes(jweet.id));
	}, [currentUser.bookmark, jweet.id]);

	const toggleBookmark = async () => {
		bookmarkClick();
		if (currentUser.bookmark.includes(jweet.id)) {
			setBookmark(false);
			const cp = [...currentUser.bookmark];
			cp.splice(currentUser.bookmark.indexOf(jweet.id), 1);
			await updateDoc(doc(db, "users", currentUser.uid), {
				bookmark: cp,
			});
			dispatch(
				setCurrentUser({
					...currentUser,
					bookmark: cp,
				})
			);
		} else {
			setBookmark(true);
			const cp = [...currentUser.bookmark];
			cp.push(jweet.id);
			await updateDoc(doc(db, "users", currentUser.uid), {
				bookmark: cp,
			});
			dispatch(
				setCurrentUser({
					...currentUser,
					bookmark: cp,
				})
			);
		}
	};

	return (
		<>
			<div
				id="except"
				class={
					"mb-1 w-1/4 flex flex-row-reverse transition delay-50 duration-300 text-red-400 hover:text-red-500 " +
					(bookmark ? "text-red-500 " : " ") +
					(isMain ? "justify-center " : "")
				}
			>
				<div
					onClick={toggleBookmark}
					ref={bookmarkRef}
					id="except"
					class={
						"cursor-pointer rounded-full transition delay-50 duration-300 hover:bg-red-100 p-2 " +
						(isMain ? "" : "mt-1 mr-1")
					}
				>
					{bookmark ? (
						<AiOutlineHeart size={24} />
					) : (
						<AiTwotoneHeart  size={24} />
					)}
				</div>
			</div>
			<Snackbar
				open={bookmarkSnack}
				autoHideDuration={2000}
				onClose={bookmarkClose}
			>
				<Alert
					onClose={bookmarkClose}
					severity="success"
					color="info"
					variant="filled"
					sx={{ width: "100%" }}
				>
					{bookmark ? "좋아요" : "좋아요 취소"}
				</Alert>
			</Snackbar>
		</>
	);
};

export default BookmarkButton;
