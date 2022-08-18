import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "mybase";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
// import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const LeftButton = ({ jweet, leftBtnRef, isDetail }) => {
	const currentUser = useSelector((state) => state.user.currentUser);
	const [leftBtn, setLeftBtn] = useState(false);
	const [leftBtnSnack, setLeftBtnSnack] = useState();
	const leftBtnClick = () => setLeftBtnSnack(true);
	const leftBtnClose = (e, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setLeftBtnSnack(false);
	};
	useEffect(() => {
		setLeftBtn(jweet.leftBtn.includes(currentUser.uid));
	}, [currentUser.uid, jweet.leftBtn]);

	const toggleLeftBtn = async () => {
		if (!jweet.rightBtn.includes(currentUser.uid)) {
			leftBtnClick();
			if (jweet.leftBtn.includes(currentUser.uid)) {
				setLeftBtn(false);
				const cp = [...jweet.leftBtn];
				cp.splice(jweet.leftBtn.indexOf(currentUser.uid), 1);
				await updateDoc(doc(db, "jweets", jweet.id), {
					leftBtn: cp,
					voteCount: jweet.voteCount - 1,
				});
			} else {
				setLeftBtn(true);
				const cp = [...jweet.leftBtn];
				cp.push(currentUser.uid);
				await updateDoc(doc(db, "jweets", jweet.id), {
					leftBtn: cp,
					voteCount: jweet.voteCount + 1,
				});
			}
		}
	};
	return (
		<>
			<div
				id="except"
				class={
					"w-1/4 flex flex-row items-center transition delay-50 duration-300 hover:text-red-500 " +
					(leftBtn ? "text-red-500 " : "text-gray-400 ") +
					(isDetail ? "justify-center" : "")
				}
			>
				<div
					id="except"
					onClick={toggleLeftBtn}
					ref={leftBtnRef}
					class={
						"cursor-pointer rounded-full transition delay-50 duration-300 hover:bg-red-100 p-2 " +
						(isDetail ? " " : "mt-1 mr-1 ")
					}
				>
					{leftBtn ? (
						<AiOutlineArrowLeft size={isDetail ? 25 : 16} />
					) : (
						<AiOutlineArrowLeft size={isDetail ? 25 : 16} />
					)}
				</div>
				{!isDetail && (
					<p id="except" class="text-sm flex flex-row items-center">
						{jweet.leftBtn.length}
					</p>
				)}
			</div>
			<Snackbar open={leftBtnSnack} autoHideDuration={2000} onClose={leftBtnClose}>
				<Alert
					onClose={leftBtnClose}
					severity="success"
					color="error"
					variant="filled"
					sx={{ width: "100%" }}
				>
					{leftBtn ? "좋아요!" : "좋아요 취소!"}
				</Alert>
			</Snackbar>
		</>
	);
};

export default LeftButton;
