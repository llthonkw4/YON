
import React from "react";

const Loading = ({ loading }) => {
	return (
		<div
			class={
				"absolute left-0 top-0 w-full h-full flex-row justify-center items-center " +
				(loading ? "hidden" : "flex")
			}
		>
			
		</div>
	);
};

export default Loading;
