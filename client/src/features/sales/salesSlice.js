import { createSlice } from "@reduxjs/toolkit";
import { createSaleThunk, getSalesThunk } from "./salesThunk";

const salesSlice = createSlice({
	name: "sales",
	initialState: { list: [], loading: false, error: null },
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getSalesThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(getSalesThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.list = action.payload;
			})
			.addCase(getSalesThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(createSaleThunk.fulfilled, (state, action) => {
				state.list.unshift(action.payload);
			});
	},
});

export default salesSlice.reducer;
