import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import stocksReducer from "../features/stocks/stockSlice";
import salesReducer from "../features/sales/salesSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		stocks: stocksReducer, // ✅ register it here
		sales: salesReducer,
	},
});

export default store;
