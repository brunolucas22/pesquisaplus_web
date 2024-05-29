import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_BASE_URL_SYSTEM;
export const GLOBAL_TIMEOUT = import.meta.env.VITE_GLOBAL_TIMEOUT;

axios.defaults.withCredentials = true;

export const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		accept: '*/*',
	},
	timeout: parseInt(GLOBAL_TIMEOUT),
});

export const apiFormData = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'multipart/form-data',
		accept: '*/*',
	},
	timeout: parseInt(GLOBAL_TIMEOUT),
});
