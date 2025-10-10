import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, fetchCurrentUser } from "./authThunk";

const initialState = {
	user: null,
	isLoading: false,
	isError: false,
	errorMessage: "",
	isSuccess: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetState: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			// Register
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload.data.user;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload.message;
			})
			// Login
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.data.user;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload.message;
			})
			// Logout
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			})
			// Fetch current user
			.addCase(fetchCurrentUser.fulfilled, (state, action) => {
				state.user = action.payload.data;
			});
	},
});

export const { resetState } = authSlice.actions;
export default authSlice.reducer;
