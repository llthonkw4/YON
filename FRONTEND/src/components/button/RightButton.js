import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "mybase";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
// import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const RightButton = ({ jweet, rightBtnRef, isDetail }) => {
	const currentUser = useSelector((state) => state.user.currentUser);
	const [rightBtn, setRightBtn] = useState(false);
	const [rightBtnSnack, setRightBtnSnack] = useState();
	const rightBtnClick = () => setRightBtnSnack(true);
	const rightBtnClose = (e, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setRightBtnSnack(false);
	};
	useEffect(() => {
		setRightBtn(jweet.rightBtn.includes(currentUser.uid));
	}, [currentUser.uid, jweet.rightBtn]);

	const toggleRightBtn = async () => {
		if (!jweet.leftBtn.includes(currentUser.uid)) {
			rightBtnClick();
			if (jweet.rightBtn.includes(currentUser.uid)) {
				setRightBtn(false);
				const cp = [...jweet.rightBtn];
				cp.splice(jweet.rightBtn.indexOf(currentUser.uid), 1);
				await updateDoc(doc(db, "jweets", jweet.id), {
					rightBtn: cp,
					voteCount: jweet.voteCount - 1,
				});
				
			} else {
				setRightBtn(true);
				const cp = [...jweet.rightBtn];
				cp.push(currentUser.uid);
				await updateDoc(doc(db, "jweets", jweet.id), {
					rightBtn: cp,
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
					(rightBtn ? "text-red-500 " : "text-gray-400 ") +
					(isDetail ? "justify-center" : "")
				}
			>
				<div
					id="except"
					onClick={toggleRightBtn}
					ref={rightBtnRef}
					class={
						"cursor-pointer rounded-full transition delay-50 duration-300 hover:bg-red-100 p-2 " +
						(isDetail ? " " : "mt-1 mr-1 ")
					}
				>
					{rightBtn ? (
						<AiOutlineArrowRight size={isDetail ? 25 : 16} />
					) : (
						<AiOutlineArrowRight size={isDetail ? 25 : 16} />
					)}
				</div>
				{!isDetail && (
					<p id="except" class="text-sm flex flex-row items-center">
						{jweet.rightBtn.length}
					</p>
				)}
			</div>
			<Snackbar open={rightBtnSnack} autoHideDuration={2000} onClose={rightBtnClose}>
				<Alert
					onClose={rightBtnClose}
					severity="success"
					color="error"
					variant="filled"
					sx={{ width: "100%" }}
				>
					{rightBtn ? "좋아요!" : "좋아요 취소!"}
				</Alert>
			</Snackbar>
		</>
	);
};

export default RightButton;
