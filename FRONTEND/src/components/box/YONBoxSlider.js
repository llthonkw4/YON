import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import BookmarkButton from "components/button/BookmarkButton";
import DeleteButton from "components/button/DeleteButton";
import LikeButton from "components/button/LikeButton";
import ReplyButton from "components/button/ReplyButton";
import UpdateButton from "components/button/UpdateButton";
import DeleteJweetModal from "components/modal/DeleteJweetModal";
import ImageModal from "components/modal/ImageModal";
import UpdateJweetModal from "components/modal/UpdateJweetModal";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "mybase";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import RightButton from "components/button/RightButton";
import LeftButton from "components/button/LeftButton";
import { Scrollbar } from "swiper";

const YONBox = (props) => {
  const history = useHistory();
  const jweet = props.jweet;
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const funcRef = useRef();
  const [func, setFunc] = useState(false);

  const [creatorInfo, setCreatorInfo] = useState({});
  const toggleFunc = () => {
    if (jweet.creatorId === currentUser.uid) setFunc(!func);
  };
  const [replyOpen, setReplyOpen] = useState(false);
  const handleReplyOpen = () => setReplyOpen(true);
  const handleReplyClose = () => {
    setReplyOpen(false);
  };
  const [updateOpen, setUpdateOpen] = useState(false);
  const handleUpdateOpen = () => setUpdateOpen(true);
  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  useEffect(() => {
    //console.log(jweet);
    return () => setLoading(false);
  }, []);
  useEffect(() => {
    if (!func) return;
    function handleClick(e) {
      if (funcRef.current === null) {
        return;
      } else if (!funcRef.current.contains(e.target)) {
        setFunc(false);
      }
    }
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [func]);

  const timeToString = (timestamp) => {
    var date = new Date(timestamp);
    let str =
      date.getFullYear() +
      "??? " +
      Number(date.getMonth() + 1) +
      "??? " +
      date.getDate() +
      "??? ";
    return str;
  };

  const [photoOpen, setPhotoOpen] = useState(false);
  const handlePhotoOpen = () => setPhotoOpen(true);
  const handlePhotoClose = () => {
    setPhotoOpen(false);
  };
  useEffect(() => {
    onSnapshot(doc(db, "users", jweet.creatorId), (doc) => {
      setCreatorInfo(doc.data());
      setLoading(true);
    });
  }, [jweet]);
  const exceptRef = useRef();
  const modalRef = useRef();
  const profileRef = useRef();
  const replyRef = useRef();
  const reJweetRef = useRef();
  const likeRef = useRef();
  const bookmarkRef = useRef();
  const leftBtnRef = useRef();
  const rightBtnRef = useRef();
  const leftTextRef = useRef();
  const rightTextRef = useRef();
  const voteCount = useRef();
  const divStyle={
    overflowY: 'scroll',
    overflowX: 'hidden', 
    width: '100%',
    float: 'left',
    height:'80%',
    position:'relative'
  };
  const goJweet = (e) => {
    if (
      e.target !== exceptRef.current &&
      e.target !== profileRef.current &&
      e.target !== replyRef.current &&
      e.target !== reJweetRef.current &&
      e.target !== likeRef.current &&
      e.target !== bookmarkRef.current &&
      e.target !== leftBtnRef.current &&
      e.target !== rightBtnRef.current &&
      e.target !== leftTextRef.current &&
      e.target !== rightTextRef.current &&
      e.target !== voteCount.current &&
      e.target.tagName !== "svg" &&
      e.target.tagName !== "path" &&
      e.target.id !== "except" &&
      e.target.innerText !== "Modify YoN" &&
      e.target.innerText !== "Delete YoN" &&
      !e.target.className.includes("MuiBackdrop") &&
      !photoOpen &&
      !updateOpen &&
      !replyOpen &&
      !deleteOpen
    ) {
      history.push("/yon/" + jweet.id);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div class='w-screen h-full select-none z-30 cursor-pointer max-w-xl hover:bg-gray-100 transition delay-50 duration-300 flex flex-col px-2 border-b border-gray-200 '>
      <div onClick={goJweet} class='w-full h-full max-w-xl flex flex-row'>
        <>
          <div class='flex flex-col'>
            {loading ? (
              <div/>
            ) : (
              <div class='h-16 w-16 p-2'>
                <Skeleton variant='circular'>
                  <Avatar sx={{ width: 48, height: 48 }} />
                </Skeleton>
              </div>
            )}
          </div>
          <div class='w-full h-full relative'>
            {loading ? (
              <div class='w-full flex flex-row mr-2 justify-between items-center'>
                <div class="h-16 w-16 pb-2 pl-2 pr-2 pt-4">
                  <Avatar
                    src={creatorInfo.photoURL}
                    sx={{ width: 48, height: 48 }}
                  />
                </div>
                <div class='w-full flex flex-row justify-start pt-4 pl-2'>
                  <div class='flex flex-col w-full max-w-xl'>
                    <h1 class='text-base font-bold -mb-2'>
                      {creatorInfo.displayName}
                    </h1>
                    <p class='text-gray-500 text-sm whitespace-pre-wrap break-words'>
                      @{creatorInfo.email ? creatorInfo.email.split("@")[0] : ""}
                    </p>
                    <p class='text-gray-500 text-xs'>{timeToString(jweet.createdAt)}</p>
                  </div>
                </div>
                <div
                  ref={funcRef}
                  id='except'
                  class={
                    "cursor-pointer transition delay-50 duration-300 rounded-full p-2 relative " +
                    (jweet.creatorId === currentUser.uid
                      ? "hover:bg-purple-100"
                      : "")
                  }>
                  <HiOutlineDotsHorizontal
                    id='except'
                    onClick={toggleFunc}
                    size={28}
                  />
                  {func && (
                    <div class='bg-white border border-gray-200 z-40 absolute flex flex-col top-2 right-2 w-60 rounded-md shadow-xl'>
                      <UpdateButton
                        handleOpen={handleUpdateOpen}
                        text={"Modify YoN"}
                      />
                      <DeleteButton
                        handleOpen={handleDeleteOpen}
                        text={"Delete YoN"}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Skeleton width='100%'>
                <div class='h-8'></div>
              </Skeleton>
            )}
            {loading ? (
              <>
                <div style={divStyle} class='break-all w-full h-auto min-w-0'>
                  <p class='ml-3 mt-5 w-auto h-auto outline-none cursor-pointer bg-transparent whitespace-pre-wrap break-words'>
                    {jweet.text}
                  </p>
                {jweet.attachmentUrl !== "" && (
                  <div class='w-full mt-4 mb-2 pr-4'>
                    <img
                      onClick={handlePhotoOpen}
                      ref={exceptRef}
                      src={jweet.attachmentUrl}
                      class='max-h-80 w-full object-cover rounded-xl border border-gray-200 shadow-lg'
                      alt='attachment'
                    />
                  </div>
                )}
                </div>
              </>
            ) : (
              <Skeleton width='100%'>
                <div class='w-full h-24  resize-none outline-none cursor-pointer bg-transparent whitespace-pre'></div>
              </Skeleton>
            )}

            {loading ? (
              <div id='except' class='absolute bottom-0 w-full flex flex-col mt-4 '>
                <div id='except' class='flex flex-col w-full'>
                  <div id='except' class='flex flex-row-reverse w-full'>
                    <div id='except' class='flex flex-col'>
                      <BookmarkButton likeRef={likeRef} jweet={jweet} isMain={true} />
                      <ReplyButton
                        replyRef={replyRef}
                        jweet={jweet}
                        isMain={true}
                        replyOpen={replyOpen}
                        handleReplyOpen={handleReplyOpen}
                        handleReplyClose={handleReplyClose}
                      />
                  </div>
                  </div>
                  <div id='except' class='flex flex-row justify-between w-full'>
                      {
                        (jweet.leftBtn + jweet.rightBtn).includes(currentUser.uid) ?
                        <>
                        <div class='w-1/3 bg-tansparent'>
                          <LeftButton leftBtnRef={leftBtnRef} jweet={jweet} isMain={true} />
                        </div>
                        <div class='font-bold text-4xl pt-3'>
                          {jweet.leftBtn.length} vs {jweet.rightBtn.length}
                        </div>
                        <div class='w-1/3 bg-tansparent'>
                          <RightButton rightBtnRef={rightBtnRef} jweet={jweet} isMain={true} />
                        </div>
                        </>
                        :
                        <>
                        <div class='w-1/2 bg-tansparent'>
                          <LeftButton leftBtnRef={leftBtnRef} jweet={jweet} isMain={true} />
                        </div>
                        <div class='w-1/2 bg-tansparent'>
                          <RightButton rightBtnRef={rightBtnRef} jweet={jweet} isMain={true} />
                        </div>
                        </>
                      }
                  </div>
                </div>
              </div>
            ) : (
              <Skeleton width='100%'>
                <div class='w-full h-12  resize-none outline-none cursor-pointer bg-transparent whitespace-pre	'></div>
              </Skeleton>
            )}
          </div>
          <UpdateJweetModal
            jweet={jweet}
            updateOpen={updateOpen}
            handleUpdateClose={handleUpdateClose}
          />
          <DeleteJweetModal
            jweet={jweet}
            deleteOpen={deleteOpen}
            goBack={false}
            handleDeleteClose={handleDeleteClose}
          />
          <ImageModal
            modalRef={modalRef}
            photoURL={jweet.attachmentUrl}
            photoOpen={photoOpen}
            handlePhotoOpen={handlePhotoOpen}
            handlePhotoClose={handlePhotoClose}
          />
        </>
      </div>
    </div>
  );
};

export default YONBox;
