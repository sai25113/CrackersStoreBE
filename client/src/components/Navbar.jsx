// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../features/auth/authThunk"; // adjust path if needed
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// const Navbar = () => {
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();
// 	const { user } = useSelector((state) => state.auth);

// 	const handleLogout = () => {
// 		dispatch(logout());
// 		navigate("/login");
// 	};

// 	return (
// 		<nav className="bg-blue-600 text-white p-3 flex justify-between items-center shadow-md">
// 			<div
// 				onClick={() => navigate("/dashboard")}
// 				className="flex items-center gap-2 cursor-pointer"
// 			>
// 				<span className="text-2xl">🎇</span>
// 				<h1 className="text-xl font-bold">Crackers Dashboard</h1>
// 			</div>

// 			<div className="flex items-center gap-4">
// 				{user ? (
// 					<>
// 						<div className="text-sm text-right">
// 							<p className="font-semibold">{user.name}</p>
// 							<p className="text-xs opacity-80">{user.role}</p>
// 						</div>
// 						<Link to="/sales" className="mx-2 text-blue-600">
// 							Sales
// 						</Link>
// 						<Link to="/sales-history" className="mx-2 text-blue-600">
// 							History
// 						</Link>

// 						<button
// 							onClick={handleLogout}
// 							className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
// 						>
// 							Logout
// 						</button>
// 					</>
// 				) : (
// 					<button
// 						onClick={() => navigate("/login")}
// 						className="bg-white text-blue-600 px-3 py-1 rounded-lg font-semibold text-sm"
// 					>
// 						Login
// 					</button>
// 				)}
// 			</div>
// 		</nav>
// 	);
// };

// export default Navbar;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authThunk";
import { useNavigate, useLocation } from "react-router-dom";
import {
	Navbar as BootstrapNavbar,
	Nav,
	Container,
	Dropdown,
	Button,
	Badge,
} from "react-bootstrap";
import {
	User,
	LogOut,
	Package,
	ShoppingCart,
	History,
	Settings,
	Menu,
	Sparkles,
	TrendingUp,
} from "lucide-react";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useSelector((state) => state.auth);

	// Get stats from Redux store if available
	const { list: stocks } = useSelector((state) => state.stocks);
	const { list: sales } = useSelector((state) => state.sales);

	const [expanded, setExpanded] = useState(false);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
		setExpanded(false);
	};

	const handleNavigation = (path) => {
		navigate(path);
		setExpanded(false);
	};

	const isActive = (path) => location.pathname === path;

	// Calculate some stats for the navbar
	const totalStocks = stocks?.length || 0;
	const todaySales =
		sales?.filter(
			(sale) =>
				new Date(sale.createdAt).toDateString() === new Date().toDateString(),
		).length || 0;

	return (
		<BootstrapNavbar
			expand="lg"
			className="bg-white shadow-sm border-bottom sticky-top"
			expanded={expanded}
			onToggle={() => setExpanded(!expanded)}
		>
			<Container fluid>
				{/* Brand Logo */}
				<BootstrapNavbar.Brand
					className="d-flex align-items-center cursor-pointer"
					onClick={() => handleNavigation("/dashboard")}
					style={{ cursor: "pointer" }}
				>
					<div className="bg-primary bg-opacity-10 p-2 rounded me-2">
						<Sparkles size={24} className="text-primary" />
					</div>
					<div>
						<span className="fw-bold text-primary fs-4">CrackersPro</span>
						<br />
						<small className="text-muted d-none d-sm-block">
							Inventory Management
						</small>
					</div>
				</BootstrapNavbar.Brand>

				{/* Mobile Toggle */}
				<BootstrapNavbar.Toggle aria-controls="basic-navbar-nav">
					<Menu size={20} />
				</BootstrapNavbar.Toggle>

				<BootstrapNavbar.Collapse id="basic-navbar-nav">
					{/* Navigation Links */}
					<Nav className="me-auto">
						<Nav.Link
							onClick={() => handleNavigation("/dashboard")}
							className={`d-flex align-items-center mx-2 ${
								isActive("/dashboard")
									? "active text-primary fw-semibold"
									: "text-dark"
							}`}
						>
							<Package size={18} className="me-2" />
							Stock Dashboard
							{totalStocks > 0 && (
								<Badge bg="primary" className="ms-2" pill>
									{totalStocks}
								</Badge>
							)}
						</Nav.Link>

						<Nav.Link
							onClick={() => handleNavigation("/spin-wheel")}
							className={`d-flex align-items-center mx-2 ${
								isActive("/spin-wheel")
									? "active text-primary fw-semibold"
									: "text-dark"
							}`}
						>
							<Sparkles size={18} className="me-2 text-warning" />
							Spin & Win
						</Nav.Link>

						<Nav.Link
							onClick={() => handleNavigation("/admin-wheel")}
							className={`d-flex align-items-center mx-2 ${
								isActive("/admin-wheel")
									? "active text-primary fw-semibold"
									: "text-dark"
							}`}
						>
							<Sparkles size={18} className="me-2 text-warning" />
							Edit Spin & Win
						</Nav.Link>

						<Nav.Link
							onClick={() => handleNavigation("/sales")}
							className={`d-flex align-items-center mx-2 ${
								isActive("/sales")
									? "active text-primary fw-semibold"
									: "text-dark"
							}`}
						>
							<ShoppingCart size={18} className="me-2" />
							Sales
							{todaySales > 0 && (
								<Badge bg="success" className="ms-2" pill>
									{todaySales} today
								</Badge>
							)}
						</Nav.Link>

						<Nav.Link
							onClick={() => handleNavigation("/sales-history")}
							className={`d-flex align-items-center mx-2 ${
								isActive("/sales-history")
									? "active text-primary fw-semibold"
									: "text-dark"
							}`}
						>
							<History size={18} className="me-2" />
							Sales History
						</Nav.Link>

						<Nav.Link
							onClick={() => handleNavigation("/analytics")}
							className={`d-flex align-items-center mx-2 ${
								isActive("/analytics")
									? "active text-primary fw-semibold"
									: "text-dark"
							}`}
						>
							<TrendingUp size={18} className="me-2" />
							Analytics
						</Nav.Link>
					</Nav>

					{/* User Section */}
					<Nav className="align-items-center">
						{user ? (
							<>
								{/* Quick Stats - Desktop Only */}
								<div className="d-none d-lg-flex me-4">
									<div className="text-end">
										<div className="text-dark fw-semibold">{user.name}</div>
										<div className="text-muted small text-capitalize">
											{user.role}
										</div>
									</div>
								</div>

								{/* User Dropdown */}
								<Dropdown align="end">
									<Dropdown.Toggle
										variant="outline-primary"
										className="d-flex align-items-center border-0"
										id="user-dropdown"
									>
										<div className="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
											<User size={16} className="text-primary" />
										</div>
										<span className="d-none d-md-inline">{user.name}</span>
									</Dropdown.Toggle>

									<Dropdown.Menu className="shadow border-0">
										<Dropdown.Header className="text-muted small">
											Signed in as {user.email}
										</Dropdown.Header>
										<Dropdown.Divider />

										<Dropdown.Item
											onClick={() => handleNavigation("/profile")}
											className="d-flex align-items-center"
										>
											<User size={16} className="me-2" />
											Profile
										</Dropdown.Item>

										<Dropdown.Item
											onClick={() => handleNavigation("/settings")}
											className="d-flex align-items-center"
										>
											<Settings size={16} className="me-2" />
											Settings
										</Dropdown.Item>

										<Dropdown.Item
											onClick={() => handleNavigation("/change-password")}
											className="d-flex align-items-center"
										>
											<Settings size={16} className="me-2" />
											Change Password
										</Dropdown.Item>

										<Dropdown.Divider />

										<Dropdown.Item
											onClick={handleLogout}
											className="d-flex align-items-center text-danger"
										>
											<LogOut size={16} className="me-2" />
											Logout
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</>
						) : (
							<div className="d-flex gap-2">
								<Button
									variant="outline-primary"
									size="sm"
									onClick={() => handleNavigation("/login")}
									className="d-flex align-items-center"
								>
									<User size={16} className="me-1" />
									Login
								</Button>
								<Button
									variant="primary"
									size="sm"
									onClick={() => handleNavigation("/register")}
									className="d-flex align-items-center"
								>
									<User size={16} className="me-1" />
									Register
								</Button>
							</div>
						)}
					</Nav>
				</BootstrapNavbar.Collapse>
			</Container>

			{/* Custom CSS for active state */}
			<style>{`
        .navbar-nav .nav-link.active {
          background-color: rgba(13, 110, 253, 0.1);
          border-radius: 0.375rem;
        }
        .navbar-brand {
          cursor: pointer;
          user-select: none;
        }
        .dropdown-toggle::after {
          margin-left: 0.5rem;
        }
        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
		</BootstrapNavbar>
	);
};

export default Navbar;
