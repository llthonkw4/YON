import GithubButton from "components/button/GithubButton";
import GoogleButton from "components/button/GoogleButton";
import React from "react";
import EmailButton from "components/button/EmailButton";

const RegisterContainer = ({ handleOpen, toggleLogin }) => {
	return (
		<>
			<h1 class="text-xl md:text-3xl font-bold mb-8">
				오늘 YoN에 가입하세요.
			</h1>
			<GoogleButton isLogin={false} />
			<EmailButton handleOpen={handleOpen} isLogin={false} />
			<h1 class="w-full md:w-1/2 mb-4">
				By signing up, you agree to the{" "}
				<span class="text-blue-600">Terms of Service</span> and{" "}
				<span class="text-blue-600">Privacy Policy</span>, including{" "}
				<span class="text-blue-600">Cookie Use.</span>
			</h1>
		</>
	);
};

export default RegisterContainer;
