import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL; // Vite

export const createSaleThunk = createAsyncThunk(
	"sales/createSale",
	async (data) => {
		const res = await axios.post(`${API_URL}/sales`, data);
		return res.data;
	},
);

export const getSalesThunk = createAsyncThunk("sales/getSales", async () => {
	const res = await axios.get(`${API_URL}/sales`);
	return res.data;
});
