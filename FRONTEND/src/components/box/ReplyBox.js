import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import Snackbar from "@mui/material/Snackbar";
import UpdateReplyModal from "components/modal/UpdateReplyModal";
import DeleteButton from "components/button/DeleteButton";
import UpdateButton from "components/button/UpdateButton";
import DeleteReplyModal from "components/modal/DeleteReplyModal";
import ImageModal from "components/modal/ImageModal";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "mybase";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ReplyBox = ({ reply }) => {
	const [loading, setLoading] = useState(false);
	const currentUser = useSelector((state) => state.user.currentUser);
	const funcRef = useRef();
	const [clickModal, setClickModal] = useState(false);
	const [like, setLike] = useState(false);

	const [creatorInfo, setCreatorInfo] = useState({});
	const toggleModal = () => setClickModal(!clickModal);

	// reply 모달
	const [replyOpen, setReplyOpen] = useState(false);
	const handleReplyOpen = () => setReplyOpen(true);
	const handleReplyClose = () => {
		setReplyOpen(false);
	};

	const [deleteOpen, setDeleteOpen] = useState(false);
	const handleDeleteOpen = () => setDeleteOpen(true);
	const handleDeleteClose = () => {
		setDeleteOpen(false);
	};

	const [likeSnack, setLikeSnack] = useState();
	const likeClick = () => setLikeSnack(true);
	const likeClose = (e, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setLikeSnack(false);
	};

	useEffect(() => {
		if (!clickModal) return;
		function handleClick(e) {
			if (funcRef.current === null) {
				return;
			} else if (!funcRef.current.contains(e.target)) {
				setClickModal(false);
			}
		}
		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [clickModal]);

	useEffect(() => {
		setLike(reply.like.includes(currentUser.uid));
		const docRef = doc(db, "users", reply.creatorId);
		getDoc(docRef).then((snap) => {
			if (snap.exists()) {
				setCreatorInfo(snap.data());
				setLoading(true);
			} else {
				console.log("No such document!");
			}
		});
	}, [reply, currentUser]);

	const toggleLike = async () => {
		likeClick();
		if (reply.like.includes(currentUser.uid)) {
			setLike(false);
			const cp = [...reply.like];
			cp.splice(reply.like.indexOf(currentUser.uid), 1);
			await updateDoc(doc(db, "replies", reply.id), {
				like: cp,
			});
		} else {
			setLike(true);
			const cp = [...reply.like];
			cp.push(currentUser.uid);
			await updateDoc(doc(db, "replies", reply.id), {
				like: cp,
			});
		}
	};

	const [photoOpen, setPhotoOpen] = useState(false);
	const handlePhotoOpen = () => setPhotoOpen(true);
	const handlePhotoClose = () => {
		setPhotoOpen(false);
	};

	return (
		<div class="w-full select-none z-30 cursor-pointer hover:bg-gray-100 transition delay-50 duration-300 flex flex-row px-2 pt-2 pb-4 border-r border-l border-b border-gray-200">
			<>
				<div class="flex flex-col">
					{loading ? (
						<Link
							to={"/profile/reply/" + reply.creatorId}
							class="h-16 w-16 p-2"
						>
							<Avatar
								src={creatorInfo.photoURL}
								sx={{ width: 48, height: 48 }}
							/>
						</Link>
					) : (
						<div class="h-16 w-16 p-2">
							<Skeleton variant="circular">
								<Avatar sx={{ width: 48, height: 48 }} />
							</Skeleton>
						</div>
					)}
				</div>
				<div class="w-full flex flex-col pl-2">
					{loading ? (
						<div class="w-full flex flex-row mr-2 justify-between items-center">
							<div class="flex flex-row">
								<h1 class="text-base font-bold">
									{creatorInfo.displayName}
								</h1>
								<p class="text-gray-500">
									@{creatorInfo.email ? creatorInfo.email.split("@")[0] : ""}
								</p>
							</div>
							{
								<div
									ref={funcRef}
									id="except"
									class={
										"cursor-pointer transition delay-50 duration-300 rounded-full p-2 relative " +
										(reply.creatorId === currentUser.uid
											? "hover:bg-purple-100"
											: "")
									}
								>
									<HiOutlineDotsHorizontal
										id="except"
										onClick={
											reply.creatorId === currentUser.uid ? toggleModal : ""
										}
										size={28}
									/>
									{clickModal && (
										<div
											id="except"
											class="bg-white border border-gray-200 z-40 absolute flex flex-col top-2 right-2 w-60 rounded-md shadow-xl"
										>
											<UpdateButton
												handleOpen={handleReplyOpen}
												text={"Update Reply"}
											/>
											<DeleteButton
												handleOpen={handleDeleteOpen}
												text={"Delete Reply"}
											/>
										</div>
									)}
								</div>
							}
						</div>
					) : (
						<Skeleton width="100%">
							<div class="h-8"></div>
						</Skeleton>
					)}
					{loading ? (
						<div class="w-full h-auto">
							<div class="w-full h-auto resize-none outline-none cursor-pointer bg-transparent whitespace-pre	">
								{reply.text}
							</div>
						</div>
					) : (
						<Skeleton width="100%">
							<div class="w-full h-24  resize-none outline-none cursor-pointer bg-transparent whitespace-pre	"></div>
						</Skeleton>
					)}
					{reply.attachmentUrl !== "" && (
						<div class="w-full mt-4 mb-2 pr-4 ">
							<img
								onClick={handlePhotoOpen}
								src={reply.attachmentUrl}
								class="w-full object-cover rounded-xl border border-gray-200 shadow-lg"
								alt="attachment"
							/>
						</div>
					)}
					{loading ? (
						<div id="except" class="w-full flex flex-row items-center mt-4 ">
							<div
								onClick={toggleLike}
								id="except"
								class="w-1/2 flex flex-row items-center transition delay-50 duration-300 text-gray-400 hover:text-red-500"
							>
								<div
									id="except"
									class="rounded-full transition delay-50 duration-300 hover:bg-red-100 mt-1 mr-1 p-2"
								>
									{reply.like.includes(currentUser.uid) ? (
										<AiTwotoneHeart size={16} class="text-red-500" />
									) : (
										<AiOutlineHeart size={16} />
									)}
								</div>
								<p id="except" class="text-sm flex flex-row items-center">
									{reply.like.length}
								</p>
							</div>
						</div>
					) : (
						<Skeleton width="100%">
							<div class="w-full h-8 resize-none outline-none cursor-pointer bg-transparent whitespace-pre	"></div>
						</Skeleton>
					)}
				</div>
				<UpdateReplyModal
					reply={reply}
					replyOpen={replyOpen}
					handleReplyClose={handleReplyClose}
				/>
				<DeleteReplyModal
					reply={reply}
					deleteOpen={deleteOpen}
					handleDeleteClose={handleDeleteClose}
				/>
				<Snackbar open={likeSnack} autoHideDuration={2000} onClose={likeClose}>
					<Alert
						onClose={likeClose}
						severity="success"
						color="error"
						variant="filled"
						sx={{ width: "100%" }}
					>
						{like ? "좋아요!" : "좋아요 취소!"}
					</Alert>
				</Snackbar>
				<ImageModal
					photoURL={reply.attachmentUrl}
					photoOpen={photoOpen}
					handlePhotoOpen={handlePhotoOpen}
					handlePhotoClose={handlePhotoClose}
				/>
			</>
		</div>
	);
};

export default ReplyBox;
