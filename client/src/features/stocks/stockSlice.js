// import { createSlice } from "@reduxjs/toolkit";
// import { getStocks, addStock, editStock, removeStock } from "./stockThunk";

// const stockSlice = createSlice({
// 	name: "stock",
// 	initialState: { list: [], loading: false, error: null },
// 	reducers: {},
// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(getStocks.pending, (state) => {
// 				state.loading = true;
// 			})
// 			.addCase(getStocks.fulfilled, (state, action) => {
// 				state.loading = false;
// 				state.list = action.payload;
// 			})
// 			.addCase(getStocks.rejected, (state, action) => {
// 				state.loading = false;
// 				state.error = action.error.message;
// 			})
// 			.addCase(addStock.fulfilled, (state, action) => {
// 				state.list.unshift(action.payload.stock);
// 			})
// 			.addCase(editStock.fulfilled, (state, action) => {
// 				const index = state.list.findIndex(
// 					(i) => i._id === action.payload.stock._id,
// 				);
// 				if (index >= 0) state.list[index] = action.payload.stock;
// 			})
// 			.addCase(removeStock.fulfilled, (state, action) => {
// 				state.list = state.list.filter((i) => i._id !== action.payload);
// 			});
// 	},
// });

// export default stockSlice.reducer;

// features/stocksSlice.js

import { createSlice } from "@reduxjs/toolkit";
import {
	getStocksThunk,
	addStockThunk,
	updateStockThunk,
	deleteStockThunk,
	updateSellingPriceThunk,
} from "./stockThunk";

const stocksSlice = createSlice({
	name: "stocks",
	initialState: {
		list: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			// 🟡 Fetch Stocks
			.addCase(getStocksThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getStocksThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.list = action.payload;
			})
			.addCase(getStocksThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			// 🟢 Add or Update (merge)
			.addCase(addStockThunk.fulfilled, (state, action) => {
				const newStock = action.payload.stock;
				const idx = state.list.findIndex((s) => s._id === newStock._id);
				if (idx !== -1) {
					state.list[idx] = newStock; // replace updated stock
				} else {
					state.list.unshift(newStock); // new stock → top of list
				}
			})

			// 🟢 Update
			.addCase(updateStockThunk.fulfilled, (state, action) => {
				const updated = action.payload.stock;
				const idx = state.list.findIndex((s) => s._id === updated._id);
				if (idx !== -1) state.list[idx] = updated;
			})

			// 🔴 Delete
			.addCase(deleteStockThunk.fulfilled, (state, action) => {
				const id = action.payload;
				state.list = state.list.filter((s) => s._id !== id);
			})

			.addCase(updateSellingPriceThunk.fulfilled, (state, action) => {
				const idx = state.list.findIndex((i) => i._id === action.payload._id);
				if (idx !== -1) state.list[idx] = action.payload;
			});
	},
});

export default stocksSlice.reducer;
