import React, { useState } from "react";
import { forgotPassword } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		setError("");
		try {
			const res = await forgotPassword({ email });
			setMessage("Password reset link sent to your email!");
		} catch (err) {
			setError(err.response?.data?.message || err.message);
		}
	};

	return (
		<div>
			<h2>Forgot Password</h2>
			{message && <p style={{ color: "green" }}>{message}</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<button type="submit">Send Reset Link</button>
			</form>
		</div>
	);
};

export default ForgotPasswordPage;
