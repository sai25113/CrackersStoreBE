import React, { useState } from "react";
import { resetPassword } from "../../api/auth";
import { useParams, useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		setError("");
		try {
			await resetPassword(token, { newPassword: password });
			setMessage("Password reset successfully!");
			setTimeout(() => navigate("/login"), 2000);
		} catch (err) {
			setError(err.response?.data?.message || err.message);
		}
	};

	return (
		<div>
			<h2>Reset Password</h2>
			{message && <p style={{ color: "green" }}>{message}</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}
			<form onSubmit={handleSubmit}>
				<input
					type="password"
					placeholder="New Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Reset Password</button>
			</form>
		</div>
	);
};

export default ResetPasswordPage;
