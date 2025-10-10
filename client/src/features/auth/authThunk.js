import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "../../api/auth";

// Register
export const register = createAsyncThunk(
	"auth/register",
	async (userData, { rejectWithValue }) => {
		try {
			const response = await authAPI.registerUser(userData);
			return response;
		} catch (err) {
			return rejectWithValue(err.response?.data || { message: err.message });
		}
	},
);

// Login
export const login = createAsyncThunk(
	"auth/login",
	async (userData, { rejectWithValue }) => {
		try {
			const response = await authAPI.loginUser(userData);
			return response;
		} catch (err) {
			return rejectWithValue(err.response?.data || { message: err.message });
		}
	},
);

// Logout
export const logout = createAsyncThunk(
	"auth/logout",
	async (_, { rejectWithValue }) => {
		try {
			const response = await authAPI.logoutUser();
			return response;
		} catch (err) {
			return rejectWithValue(err.response?.data || { message: err.message });
		}
	},
);

// Get current user
export const fetchCurrentUser = createAsyncThunk(
	"auth/fetchCurrentUser",
	async (_, { rejectWithValue }) => {
		try {
			const response = await authAPI.getCurrentUser();
			return response;
		} catch (err) {
			return rejectWithValue(err.response?.data || { message: err.message });
		}
	},
);
