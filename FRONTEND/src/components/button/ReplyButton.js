import CreateReplyModal from "components/modal/CreateReplyModal";
import React from "react";
import { BsChat } from "react-icons/bs";

const ReplyButton = ({
	jweet,
	isMain,
	handleReplyOpen,
	replyOpen,
	handleReplyClose,
}) => {
	return (
		<>
			<div
				id="except"
				class={
					"flex flex-row items-center transition delay-50 duration-300 text-black hover:text-purple-500"
				}
			>
				<div
					onClick={handleReplyOpen}
					id="except"
					class={
						"rounded-full transition delay-50 duration-300 hover:bg-purple-100 p-2 cursor-pointer"
					}
				>
					<BsChat size={isMain? 36 : 20} />
				</div>
			</div>
			<CreateReplyModal
				jweet={jweet}
				replyOpen={replyOpen}
				handleReplyClose={handleReplyClose}
			/>
		</>
	);
};

export default ReplyButton;
