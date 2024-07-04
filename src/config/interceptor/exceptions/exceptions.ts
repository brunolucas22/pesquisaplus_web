import { api } from '@src/config/axios';
import { baseURLs } from '@src/utils/baseUrls';
import { AxiosError } from 'axios';
import { setFailedRequestQueue, setIsRefresh } from '../Interceptor';

/* eslint-disable @typescript-eslint/no-explicit-any */
type authRefreshHandleProps = {
	err: any;
	totalDeRefresh: number;
	useFormData?: boolean;
	isRefreshing?: boolean;
	failedRequestQueue?: any[];
};

export const authRefreshHandle = ({ ...props }: authRefreshHandleProps) => {
	const originalReq = props.err.config;

	const loginResponseDTO = sessionStorage.getItem('LoginResponseDTO');
	console.log('nnnnndnalndlja');
	// if (props.err.response.status == 401 && props.totalDeRefresh >= 3) {
	// 	return (window.location.href = '/login');
	// }
	if (!props.isRefreshing) {
		setIsRefresh(true);
		if (
			props.err.response.status == 401 &&
			props.err.config &&
			loginResponseDTO &&
			!props.err.config._retry &&
			props.totalDeRefresh < 3
		) {
			console.log('nnnnndnalndlja');
			props.totalDeRefresh += 1;
			originalReq._retry = true;
			const res = api
				.post(baseURLs.refresh, {
					refresh_token: JSON.parse(loginResponseDTO).token_refresh,
				})
				.then((res) => {
					sessionStorage.setItem('LoginResponseDTO', JSON.stringify(res.data));
					originalReq.headers[
						'Authorization'
					] = `Bearer ${res.data.token_access}`;
					originalReq.headers['Content-Type'] = !props.useFormData
						? 'application/json'
						: 'multipart/form-data';

					props.failedRequestQueue?.forEach((request) =>
						request.onSuccess(res.data.token_access)
					);
					// Limpa a fila de requisições que falharam
					setFailedRequestQueue([], 'clear');

					return api(originalReq);
				})
				.catch((err) => {
					// Retorna os erros que estão salvos na fila de requisições que falharam
					props.failedRequestQueue?.forEach((request) =>
						request.onFailure(err)
					);
					// Limpa a fila de requisições que falharam
					setFailedRequestQueue([], 'clear');
				})
				.finally(() => {
					setIsRefresh(false);
				});
			return res;
		}
	}
	return new Promise((resolve, reject) => {
		// Adiciona a requisição na fila de requisições que falharam com as informações necessárias para refazer a requisição novamente
		setFailedRequestQueue({
			// Se a requisição der sucesso, chama o onSuccess
			onSuccess: (token: string) => {
				// Adiciona o novo token gerado no refresh token no header de autorização
				originalReq.headers['Authorization'] = `Bearer ${token}`;

				// Faz a requisição novamente passando as informações originais da requisição que falhou
				resolve(api(originalReq));
			},
			// Se a requisição der erro, chama o onFailure
			onFailure: (err: AxiosError) => {
				// Se não for possivel refazer a requisição, retorna o erro
				reject(err);
			},
		});
	});
};
