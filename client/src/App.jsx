// import {
// 	BrowserRouter as Router,
// 	Routes,
// 	Route,
// 	useLocation,
// } from "react-router-dom";
// import LoginPage from "./features/auth/LoginPage";
// import RegisterPage from "./features/auth/RegisterPage";
// import ForgotPasswordPage from "./features/auth/ForgotPasswordPage";
// import ResetPasswordPage from "./features/auth/ResetPasswordPage";
// import ChangePasswordPage from "./features/auth/ChangePasswordPage";
// import { Provider } from "react-redux";
// import { store } from "./app/store";
// import StockDashboard from "./features/stocks/StockDashboard";

// function App() {
// 	const location = useLocation();
// 	// Hide navbar on auth pages
// 	const hideNavbar = ["/login", "/register", "/forgot-password"].some((path) =>
// 		location.pathname.startsWith(path),
// 	);

// 	return (
// 		<Provider store={store}>
// 			<Router>
// 				{!hideNavbar && <Navbar />}
// 				<Routes>
// 					<Route path="/login" element={<LoginPage />} />
// 					<Route path="/register" element={<RegisterPage />} />
// 					<Route path="/forgot-password" element={<ForgotPasswordPage />} />
// 					<Route
// 						path="/forgot-password/:token"
// 						element={<ResetPasswordPage />}
// 					/>
// 					<Route path="/change-password" element={<ChangePasswordPage />} />
// 					<Route path="/dashboard" element={<StockDashboard />} />
// 				</Routes>
// 			</Router>
// 		</Provider>
// 	);
// }

// export default App;

import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import ForgotPasswordPage from "./features/auth/ForgotPasswordPage";
import ResetPasswordPage from "./features/auth/ResetPasswordPage";
import ChangePasswordPage from "./features/auth/ChangePasswordPage";
import { Provider } from "react-redux";
import { store } from "./app/store";
import StockDashboard from "./features/stocks/StockDashboard";
import SalesPage from "./features/sales/SalesPage";
import SalesHistoryPage from "./features/sales/SalesHistoryPage";
import SpinWheel from "./features/spinWheel/spinWheel";
import AdminRewards from "./features/spinWheel/AdminRewards";
import Navbar from "./components/Navbar";

// ✅ Put all routing + useLocation logic here
function AppContent() {
	const location = useLocation();

	// Hide navbar on login/register/forgot-password routes
	const hideNavbar = ["/login", "/register", "/forgot-password"].some((path) =>
		location.pathname.startsWith(path),
	);

	return (
		<>
			{!hideNavbar && <Navbar />}
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/forgot-password/:token" element={<ResetPasswordPage />} />
				<Route path="/change-password" element={<ChangePasswordPage />} />
				<Route path="/dashboard" element={<StockDashboard />} />
				<Route path="/sales" element={<SalesPage />} />
				<Route path="/sales-history" element={<SalesHistoryPage />} />
				<Route path="/spin-wheel" element={<SpinWheel />} />
				<Route path="/admin-wheel" element={<AdminRewards />} />
			</Routes>
		</>
	);
}

// ✅ Router must wrap *above* useLocation
function App() {
	return (
		<Provider store={store}>
			<Router>
				<AppContent />
			</Router>
		</Provider>
	);
}

export default App;
