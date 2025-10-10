import { createAsyncThunk } from "@reduxjs/toolkit";
import * as stockAPI from "../../api/stock";

// 🔹 Get all stocks
export const getStocksThunk = createAsyncThunk("stocks/getStocks", async () => {
	return await stockAPI.fetchStocks();
});

// 🔹 Add or update stock (same name → merge quantities)
export const addStockThunk = createAsyncThunk(
	"stocks/addStock",
	async (data) => {
		return await stockAPI.createStock(data);
	},
);

// 🔹 Update stock manually
export const updateStockThunk = createAsyncThunk(
	"stocks/updateStock",
	async ({ id, data }) => {
		return await stockAPI.updateStock(id, data);
	},
);

// 🔹 Delete stock
export const deleteStockThunk = createAsyncThunk(
	"stocks/deleteStock",
	async (id) => {
		await stockAPI.deleteStock(id);
		return id; // returning only ID for easy reducer handling
	},
);

export const updateSellingPriceThunk = createAsyncThunk(
	"stocks/updateSellingPrice",
	async ({ id, sellingPrice }) => {
		return await stockAPI.updateSellingPrice(id, sellingPrice);
	},
);
