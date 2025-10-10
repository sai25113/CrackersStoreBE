import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "./authThunk";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoading, isError, errorMessage } = useSelector(
		(state) => state.auth,
	);

	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(register({ userName, email, password })).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				navigate("/login");
			}
		});
	};

	return (
		<div>
			<h2>Register</h2>
			{isError && <p style={{ color: "red" }}>{errorMessage}</p>}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Username"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					required
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">{isLoading ? "Loading..." : "Register"}</button>
			</form>
			<p>
				Already have an account? <Link to="/login">Login</Link>
			</p>
		</div>
	);
};

export default RegisterPage;
