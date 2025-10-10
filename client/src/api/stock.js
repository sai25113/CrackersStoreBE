import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL; // Vite

export const fetchStocks = async () => {
	const res = await axios.get(`${API_URL}/stocks`, { withCredentials: true });
	return res.data;
};

export const createStock = async (data) => {
	console.log(data);
	const res = await axios.post(`${API_URL}/stocks`, data, {
		withCredentials: true,
	});
	return res.data;
};

export const updateStock = async (id, data) => {
	const res = await axios.put(`${API_URL}/stocks/${id}`, data, {
		withCredentials: true,
	});
	return res.data;
};

export const deleteStock = async (id) => {
	const res = await axios.delete(`${API_URL}/stocks/${id}`, {
		withCredentials: true,
	});
	return res.data;
};

export const updateSellingPrice = async (id, sellingPrice) => {
	const res = await axios.put(
		`${API_URL}/stocks/${id}/selling-price`,
		{ sellingPrice }, // 👈 send it as an object
		{
			withCredentials: true,
		},
	);
	return res.data;
};
