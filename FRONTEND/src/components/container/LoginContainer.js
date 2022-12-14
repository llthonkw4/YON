import GithubButton from "components/button/GithubButton";
import GoogleButton from "components/button/GoogleButton";
import EmailButton from "components/button/EmailButton";

import React from "react";
const loginContainer = ({ handleOpen, toggleLogin }) => {
	return (
		<>
			<h1 class="text-xl md:text-3xl font-bold mb-8 text-center">Yon 로그인하기</h1>
			<div class="content-center">
				<GoogleButton isLogin={true} />
				<EmailButton handleOpen={handleOpen} isLogin={true} />
			</div>
			<h1 class="text-center">
				계정이 없으신가요?{" "}
				<span onClick={toggleLogin} class="cursor-pointer text-blue-600">
					가입하기
				</span>
			</h1>
		</>
	);
};

export default loginContainer;
