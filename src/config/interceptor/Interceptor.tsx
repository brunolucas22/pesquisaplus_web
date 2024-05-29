// import { useNavigate } from 'react-router-dom';
// import { showErrorDialog } from 'src/components/DialogComponent/hooks';

// import { api, apiFormData } from '../axios';
// import {
// 	clientErrorHandle,
// 	serverErrorHandle,
// } from './exceptions/exceptionController';

// let totalDeRefresh: number = 0;
// let isRefreshing: boolean = false;
// let failedRequestQueue: Array<unknown> = [];

// export const clearTotalDeRefresh = () => {
// 	totalDeRefresh = 0;
// };
// export const setIsRefresh = (value: boolean) => {
// 	isRefreshing = value;
// };
// export const setFailedRequestQueue = (value: unknown, mode?: string) => {
// 	if (mode === 'clear') return (failedRequestQueue = []);
// 	failedRequestQueue.push(value);
// };

// export const Interceptors = ({ props }: JSX.Element) => {
// 	const navigate = useNavigate();

// 	api.interceptors.request.use(
// 		(config) => {
// 			const loginResponseDTO = sessionStorage.getItem('LoginResponseDTO');
// 			if (loginResponseDTO) {
// 				const accessToken = JSON.parse(loginResponseDTO).accessToken;
// 				config.headers.Authorization = `Bearer ${accessToken}`;
// 			}
// 			return config;
// 		},
// 		(error) => {
// 			return Promise.reject(error);
// 		}
// 	);

// 	api.interceptors.response.use(
// 		(response) => {
// 			clearTotalDeRefresh();
// 			return response;
// 		},
// 		async (err) => {
// 			if (err.code === 'ERR_NETWORK') {
// 				showErrorDialog({
// 					message: 'ERR_NETWORK',
// 					func() {
// 						window.location.href = '/login';
// 					},
// 				});
// 				return;
// 			}
// 			if (!err.response) return Promise.reject(err);
// 			const responseErrorDTO: any = err.response.data.ResponseErrorDTO;
// 			if (!responseErrorDTO) return (window.location.href = '/login');
// 			try {
// 				if (
// 					responseErrorDTO.statusCode >= 400 &&
// 					responseErrorDTO.statusCode < 500
// 				) {
// 					const response = await clientErrorHandle(
// 						err,
// 						totalDeRefresh,
// 						navigate,
// 						undefined,
// 						undefined,
// 						isRefreshing,
// 						failedRequestQueue
// 					);
// 					return response;
// 				}
// 				if (responseErrorDTO.statusCode >= 500) {
// 					await serverErrorHandle(responseErrorDTO);
// 				}
// 			} catch {
// 				return Promise.reject(responseErrorDTO);
// 			}
// 		}
// 	);

// 	apiFormData.interceptors.request.use(
// 		(config) => {
// 			const loginResponseDTO = sessionStorage.getItem('LoginResponseDTO');
// 			if (loginResponseDTO) {
// 				const accessToken = JSON.parse(loginResponseDTO).accessToken;
// 				config.headers.Authorization = `Bearer ${accessToken}`;
// 				config.headers['Content-Type'] = 'multipart/form-data';
// 			}
// 			return config;
// 		},
// 		(error) => {
// 			return Promise.reject(error);
// 		}
// 	);

// 	apiFormData.interceptors.response.use(
// 		(response) => {
// 			clearTotalDeRefresh();
// 			return response;
// 		},
// 		async (err) => {
// 			if (err.code === 'ERR_NETWORK') {
// 				showErrorDialog({
// 					message: 'ERR_NETWORK',
// 					func() {
// 						window.location.href = '/login';
// 					},
// 				});
// 				return;
// 			}
// 			if (!err.response) return Promise.reject(err);
// 			const responseErrorDTO: any = err.response.data.ResponseErrorDTO;
// 			if (!responseErrorDTO) return (window.location.href = '/login');
// 			try {
// 				if (
// 					responseErrorDTO.statusCode >= 400 &&
// 					responseErrorDTO.statusCode < 500
// 				) {
// 					const response = await clientErrorHandle(
// 						err,
// 						totalDeRefresh,
// 						navigate,
// 						true
// 					);
// 					return response;
// 				}
// 				if (responseErrorDTO.statusCode >= 500) {
// 					await serverErrorHandle(responseErrorDTO);
// 				}
// 			} catch {
// 				return Promise.reject(responseErrorDTO);
// 			}
// 		}
// 	);

// 	return props.children;
// };
