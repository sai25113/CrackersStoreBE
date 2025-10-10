import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Vite

export const registerUser = async (data) => {
	const res = await axios.post(`${API_URL}/auth/register`, data, {
		withCredentials: true,
	});
	return res.data;
};

export const loginUser = async (data) => {
	const res = await axios.post(`${API_URL}/auth/login`, data, {
		withCredentials: true,
	});
	return res.data;
};

export const logoutUser = async () => {
	const res = await axios.post(
		`${API_URL}/auth/logoutUser`,
		{},
		{ withCredentials: true },
	);
	return res.data;
};

export const getCurrentUser = async () => {
	const res = await axios.get(`${API_URL}/auth/current-user`, {
		withCredentials: true,
	});
	return res.data;
};

export const forgotPassword = async (data) => {
	const res = await axios.post(`${API_URL}/auth/forgot-password`, data);
	return res.data;
};

export const resetPassword = async (token, data) => {
	const res = await axios.post(`${API_URL}/auth/reset-password/${token}`, data);
	return res.data;
};

export const changePassword = async (data) => {
	const res = await axios.post(`${API_URL}/auth/change-password`, data, {
		withCredentials: true,
	});
	return res.data;
};

export const resendEmailVerification = async () => {
	const res = await axios.post(
		`${API_URL}/auth/resend-email-verification`,
		{},
		{ withCredentials: true },
	);
	return res.data;
};
