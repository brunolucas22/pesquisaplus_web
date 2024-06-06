/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { showErrorDialog } from 'src/components/DialogComponent/hooks';

import { baseURLs } from '@src/utils/baseUrls';
import { api, apiFormData } from '../axios';
import {
	clientErrorHandle,
	serverErrorHandle,
} from './exceptions/exceptionController';
// import {
// 	clientErrorHandle,
// 	serverErrorHandle,
// } from './exceptions/exceptionController';

let totalDeRefresh: number = 0;
let isRefreshing: boolean = false;
let failedRequestQueue: Array<unknown> = [];

export const clearTotalDeRefresh = () => {
	totalDeRefresh = 0;
};
export const setIsRefresh = (value: boolean) => {
	isRefreshing = value;
};
export const setFailedRequestQueue = (value: unknown, mode?: string) => {
	if (mode === 'clear') return (failedRequestQueue = []);
	failedRequestQueue.push(value);
};

type InterceptorProps = {
	children?: JSX.Element[];
};

export const Interceptors = ({ ...props }: InterceptorProps) => {
	api.interceptors.request.use(
		(config) => {
			const loginResponseDTO = sessionStorage.getItem('LoginResponseDTO');
			if (loginResponseDTO) {
				const accessToken = JSON.parse(loginResponseDTO).token_access;
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	api.interceptors.response.use(
		(response) => {
			clearTotalDeRefresh();
			if (response.config.url?.includes(baseURLs.login)) {
				sessionStorage.setItem(
					'LoginResponseDTO',
					JSON.stringify(response.data)
				);
				window.location.href = '/';
			}
			return response;
		},
		async (err) => {
			console.log(err?.response?.status);
			if (err.code === 'ERR_NETWORK') {
				showErrorDialog({
					message:
						'Servidor Indisponível no Momento. </br> Tente Novamente Mais Tarde',
					func() {
						window.location.href = '/login';
					},
				});
				throw new Error('ERR_NETWORK');
			}

			try {
				if (err?.response?.status >= 400 && err?.response?.status < 500) {
					const response = await clientErrorHandle({
						err,
						totalDeRefresh,

						isRefreshing,
						failedRequestQueue,
					});
					return response;
				}
				if (err?.response.status >= 500) {
					await serverErrorHandle(err.AxiosError);
				}
			} catch {
				return Promise.reject(err.AxiosError);
			}
		}
	);

	apiFormData.interceptors.request.use(
		(config) => {
			const loginResponseDTO = sessionStorage.getItem('LoginResponseDTO');
			if (loginResponseDTO) {
				const accessToken = JSON.parse(loginResponseDTO).token_access;
				config.headers.Authorization = `Bearer ${accessToken}`;
				config.headers['Content-Type'] = 'multipart/form-data';
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	apiFormData.interceptors.response.use(
		(response) => {
			clearTotalDeRefresh();
			return response;
		},
		async (err) => {
			if (err.code === 'ERR_NETWORK') {
				showErrorDialog({
					message: 'ERR_NETWORK',
					func() {
						window.location.href = '/login';
					},
				});
				return;
			}
			if (err?.response) return Promise.reject(err);

			try {
				if (err?.response >= 400 && err?.response < 500) {
					const response = await clientErrorHandle({
						err,
						totalDeRefresh,

						useFormData: true,
					});
					return response;
				}
				if (err?.response >= 500) {
					await serverErrorHandle(err.AxiosError);
				}
			} catch {
				return Promise.reject(err.AxiosError);
			}
		}
	);

	return <>{props.children}</>;
};
