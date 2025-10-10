// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "./authThunk";
// import { Link, useNavigate } from "react-router-dom";

// const LoginPage = () => {
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();
// 	const { isLoading, isError, errorMessage, user } = useSelector(
// 		(state) => state.auth,
// 	);

// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		dispatch(login({ email, password })).then((res) => {
// 			if (res.meta.requestStatus === "fulfilled") {
// 				navigate("/dashboard");
// 			}
// 		});
// 	};

// 	return (
// 		<div>
// 			<h2>Login</h2>
// 			{isError && <p style={{ color: "red" }}>{errorMessage}</p>}
// 			<form onSubmit={handleSubmit}>
// 				<input
// 					type="email"
// 					placeholder="Email"
// 					value={email}
// 					onChange={(e) => setEmail(e.target.value)}
// 					required
// 				/>
// 				<input
// 					type="password"
// 					placeholder="Password"
// 					value={password}
// 					onChange={(e) => setPassword(e.target.value)}
// 					required
// 				/>
// 				<button type="submit">{isLoading ? "Loading..." : "Login"}</button>
// 			</form>
// 			<p>
// 				Don't have an account? <Link to="/register">Register</Link>
// 			</p>
// 			<p>
// 				<Link to="/forgot-password">Forgot Password?</Link>
// 			</p>
// 		</div>
// 	);
// };

// export default LoginPage;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";
import { login } from "./authThunk";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoading, isError, errorMessage, user } = useSelector(
		(state) => state.auth,
	);

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log("Login attempted");
		dispatch(login({ email, password })).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				navigate("/dashboard");
			}
		});
	};

	return (
		<div
			style={{
				minHeight: "100vh",
				display: "flex",
				background:
					"linear-gradient(135deg, #ff9800 0%, #ff5722 60%, #e53935 100%)",
			}}
		>
			<div
				style={{
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: "2rem",
				}}
			>
				<div style={{ maxWidth: "480px", width: "100%" }}>
					{/* Brand Header */}
					<div
						style={{
							textAlign: "center",
							color: "white",
							marginBottom: "2rem",
						}}
					>
						<Sparkles size={56} style={{ marginBottom: "1rem" }} />
						<h1
							style={{
								fontSize: "2.5rem",
								fontWeight: "bold",
								marginBottom: "0.5rem",
							}}
						>
							Crackers Store
						</h1>
						<p style={{ fontSize: "1.1rem", opacity: 0.95 }}>
							Light up your celebrations with sparkle and joy 🎆
						</p>
					</div>

					{/* Login Card */}
					<div
						style={{
							background: "white",
							borderRadius: "1rem",
							padding: "2.5rem",
							boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
						}}
					>
						<h2
							style={{
								fontWeight: "bold",
								marginBottom: "1.5rem",
								textAlign: "center",
								fontSize: "1.75rem",
							}}
						>
							Welcome Back
						</h2>

						{isError && (
							<div
								style={{
									background: "#f8d7da",
									color: "#721c24",
									padding: "0.75rem",
									borderRadius: "0.5rem",
									marginBottom: "1rem",
									textAlign: "center",
								}}
							>
								{errorMessage}
							</div>
						)}

						<div>
							<div style={{ marginBottom: "1.25rem" }}>
								<label
									style={{
										display: "block",
										marginBottom: "0.5rem",
										fontWeight: "600",
										fontSize: "0.95rem",
									}}
								>
									Email Address
								</label>
								<div
									style={{
										display: "flex",
										border: "1px solid #ddd",
										borderRadius: "0.5rem",
										overflow: "hidden",
									}}
								>
									<span
										style={{
											background: "#f8f9fa",
											padding: "0.75rem",
											display: "flex",
											alignItems: "center",
											borderRight: "1px solid #ddd",
										}}
									>
										<Mail size={18} color="#6c757d" />
									</span>
									<input
										type="email"
										placeholder="you@example.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										style={{
											flex: 1,
											border: "none",
											padding: "0.75rem",
											fontSize: "1rem",
											outline: "none",
										}}
									/>
								</div>
							</div>

							<div style={{ marginBottom: "0.5rem" }}>
								<label
									style={{
										display: "block",
										marginBottom: "0.5rem",
										fontWeight: "600",
										fontSize: "0.95rem",
									}}
								>
									Password
								</label>
								<div
									style={{
										display: "flex",
										border: "1px solid #ddd",
										borderRadius: "0.5rem",
										overflow: "hidden",
									}}
								>
									<span
										style={{
											background: "#f8f9fa",
											padding: "0.75rem",
											display: "flex",
											alignItems: "center",
											borderRight: "1px solid #ddd",
										}}
									>
										<Lock size={18} color="#6c757d" />
									</span>
									<input
										type="password"
										placeholder="••••••••"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										style={{
											flex: 1,
											border: "none",
											padding: "0.75rem",
											fontSize: "1rem",
											outline: "none",
										}}
									/>
								</div>
							</div>

							<div style={{ textAlign: "right", marginBottom: "1.5rem" }}>
								<a
									href="#"
									onClick={(e) => e.preventDefault()}
									style={{
										color: "#dc3545",
										textDecoration: "none",
										fontSize: "0.9rem",
										fontWeight: "600",
									}}
								>
									Forgot Password?
								</a>
							</div>

							<button
								onClick={handleSubmit}
								disabled={isLoading}
								style={{
									width: "100%",
									background: "#ffc107",
									border: "none",
									borderRadius: "0.5rem",
									padding: "0.875rem",
									fontSize: "1rem",
									fontWeight: "600",
									cursor: isLoading ? "not-allowed" : "pointer",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									transition: "all 0.2s",
									opacity: isLoading ? 0.7 : 1,
								}}
								onMouseOver={(e) =>
									!isLoading && (e.target.style.background = "#ffb300")
								}
								onMouseOut={(e) =>
									!isLoading && (e.target.style.background = "#ffc107")
								}
							>
								{isLoading ? (
									<>
										<div
											style={{
												width: "18px",
												height: "18px",
												border: "2px solid rgba(255,255,255,0.3)",
												borderTopColor: "white",
												borderRadius: "50%",
												animation: "spin 0.8s linear infinite",
												marginRight: "0.5rem",
											}}
										></div>
										Signing In...
									</>
								) : (
									<>
										Sign In{" "}
										<ArrowRight size={18} style={{ marginLeft: "0.5rem" }} />
									</>
								)}
							</button>
						</div>

						<div style={{ textAlign: "center", marginTop: "1.5rem" }}>
							<p style={{ color: "#6c757d", fontSize: "0.9rem", margin: 0 }}>
								Don't have an account?{" "}
								<a
									href="#"
									onClick={(e) => e.preventDefault()}
									style={{
										color: "#dc3545",
										fontWeight: "600",
										textDecoration: "none",
									}}
								>
									Create Account
								</a>
							</p>
						</div>

						<p
							style={{
								textAlign: "center",
								color: "#6c757d",
								fontSize: "0.85rem",
								marginTop: "1.5rem",
								marginBottom: 0,
							}}
						>
							By signing in, you agree to our Terms & Privacy Policy
						</p>
					</div>
				</div>
			</div>

			<style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
		</div>
	);
};

export default LoginPage;
