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
const RightButton = ({ jweet, rightBtnRef, isMain }) => {
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
					"flex flex-row-reverse w-full items-center transition delay-50 duration-300 hover:text-red-500 " +
					(rightBtn ? "text-red-500 " : "text-black")
				}
			>
				<div
					id="except"
					onClick={toggleRightBtn}
					ref={rightBtnRef}
					class={
						"w-full cursor-pointer rounded-full transition delay-50 duration-300 bg-white hover:bg-red-100 border-4 border-slate-900 p-2 text-center"					}
				>
				No
			</div>
				
			</div>
			<Snackbar open={rightBtnSnack} autoHideDuration={2000} onClose={rightBtnClose}>
				<Alert
					onClose={rightBtnClose}
					severity="success"
					color="error"
					variant="filled"
					sx={{ width: "100%" }}
				>
					{rightBtn ? "투표 완료!" : "투표 취소!"}
				</Alert>
			</Snackbar>
		</>
	);
};

export default RightButton;
