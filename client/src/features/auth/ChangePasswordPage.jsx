import React, { useState } from "react";
import { changePassword } from "../../api/auth";
import { useSelector } from "react-redux";

const ChangePasswordPage = () => {
	const { user } = useSelector((state) => state.auth);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		setError("");
		try {
			await changePassword({ oldPassword, newPassword });
			setMessage("Password changed successfully!");
		} catch (err) {
			setError(err.response?.data?.message || err.message);
		}
	};

	if (!user) return <p>Please login first.</p>;

	return (
		<div>
			<h2>Change Password</h2>
			{message && <p style={{ color: "green" }}>{message}</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}
			<form onSubmit={handleSubmit}>
				<input
					type="password"
					placeholder="Old Password"
					value={oldPassword}
					onChange={(e) => setOldPassword(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="New Password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					required
				/>
				<button type="submit">Change Password</button>
			</form>
		</div>
	);
};

export default ChangePasswordPage;
