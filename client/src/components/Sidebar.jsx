import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
	LayoutDashboard,
	ShoppingCart,
	History,
	Settings,
	LogOut,
	Menu,
	X,
	ChevronLeft,
	User,
} from "lucide-react";

const Sidebar = ({ logout }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useSelector((state) => state.auth);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isMobileOpen, setIsMobileOpen] = useState(false);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	const menuItems = [
		{ icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
		{ icon: ShoppingCart, label: "Sales", path: "/sales" },
		{ icon: History, label: "Sales History", path: "/sales-history" },
		{ icon: Settings, label: "Settings", path: "/change-password" },
	];

	const isActive = (path) => location.pathname === path;

	return (
		<>
			{/* Mobile Menu Button */}
			<button
				onClick={() => setIsMobileOpen(!isMobileOpen)}
				className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg"
			>
				{isMobileOpen ? <X size={24} /> : <Menu size={24} />}
			</button>

			{/* Overlay for mobile */}
			{isMobileOpen && (
				<div
					className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
					onClick={() => setIsMobileOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`
          fixed top-0 left-0 h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white
          transition-all duration-300 ease-in-out z-40 shadow-2xl
          ${isCollapsed ? "w-20" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
			>
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-blue-500">
					{!isCollapsed && (
						<div className="flex items-center gap-2">
							<span className="text-3xl">🎇</span>
							<h1 className="text-xl font-bold">Crackers</h1>
						</div>
					)}
					{isCollapsed && <span className="text-3xl mx-auto">🎇</span>}

					<button
						onClick={() => setIsCollapsed(!isCollapsed)}
						className="hidden lg:block text-white hover:bg-blue-700 p-1 rounded transition-colors"
					>
						<ChevronLeft
							size={20}
							className={`transition-transform ${isCollapsed ? "rotate-180" : ""}`}
						/>
					</button>
				</div>

				{/* User Info */}
				{user && (
					<div
						className={`p-4 border-b border-blue-500 ${isCollapsed ? "text-center" : ""}`}
					>
						<div
							className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}
						>
							<div className="bg-blue-400 rounded-full p-2">
								<User size={isCollapsed ? 20 : 24} />
							</div>
							{!isCollapsed && (
								<div>
									<p className="font-semibold text-sm">{user.name}</p>
									<p className="text-xs text-blue-200">{user.role}</p>
								</div>
							)}
						</div>
					</div>
				)}

				{/* Navigation Menu */}
				<nav className="flex-1 p-4 space-y-2">
					{menuItems.map((item) => {
						const Icon = item.icon;
						const active = isActive(item.path);

						return (
							<Link
								key={item.path}
								to={item.path}
								onClick={() => setIsMobileOpen(false)}
								className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${
										active
											? "bg-white text-blue-600 shadow-lg"
											: "hover:bg-blue-700 text-white"
									}
                  ${isCollapsed ? "justify-center" : ""}
                `}
							>
								<Icon size={20} />
								{!isCollapsed && (
									<span className="font-medium">{item.label}</span>
								)}
							</Link>
						);
					})}
				</nav>

				{/* Logout Button */}
				<div className="p-4 border-t border-blue-500">
					<button
						onClick={handleLogout}
						className={`
              flex items-center gap-3 w-full px-4 py-3 rounded-lg
              bg-red-500 hover:bg-red-600 transition-colors
              ${isCollapsed ? "justify-center" : ""}
            `}
					>
						<LogOut size={20} />
						{!isCollapsed && <span className="font-medium">Logout</span>}
					</button>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
