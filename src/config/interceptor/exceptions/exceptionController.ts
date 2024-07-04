/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */

import { authRefreshHandle } from './exceptions';
// import { exceptionsService } from './exeptionsKeys';

const showDebugGlobal = import.meta.env.VITE_SHOW_DEBUG_GLOBAL === 'true';
export const serverErrorHandle = async (responseError: any) => {
	const errorMessage = responseError.message;
	if (!showDebugGlobal) console.log({ responseError });

	switch (responseError.type) {
		// case exceptionsService.DataIntegrityViolationException:
		// 	showToastError(responseError.message);
		// 	throw new Error(errorMessage);
		// case exceptionsService.Exception:
		// 	if (showDebugGlobal) {
		// 		showToastError(responseError.type);
		// 	}
		// 	throw new Error(errorMessage);
		// case exceptionsService.MappingException:
		// 	if (showDebugGlobal) {
		// 		showToastError(responseError.type);
		// 	}
		// 	throw new Error(errorMessage);
		// case exceptionsService.PropertyReferenceException:
		// 	if (showDebugGlobal) {
		// 		showToastError(responseError.type);
		// 	}
		// 	throw new Error(errorMessage);
		// case exceptionsService.SessionExpiredException:
		// 	showErrorDialog({
		// 		message: responseError.message,
		// 		func() {
		// 			window.location.href = '/login';
		// 		},
		// 	});
		// 	throw new Error(errorMessage);
		// case exceptionsService.RuntimeException:
		// 	showErrorDialog({
		// 		message: responseError.message,
		// 		func() {
		// 			window.location.href = '/login';
		// 		},
		// 	});
		// 	throw new Error(errorMessage);
		default:
			// let error = '';
			// if (showDebugGlobal) error = `?error=${JSON.stringify(responseError)}`;
			// window.location.href = `/login${error}`;
			console.log(responseError.type);
			throw new Error(errorMessage);
	}
};

type clientErrorHandleProps = {
	err: any;
	totalDeRefresh: number;

	useFormData?: boolean;
	isRefreshing?: boolean;
	failedRequestQueue?: any[];
};

export const clientErrorHandle = async ({
	...props
}: clientErrorHandleProps) => {
	switch (props.err.AxiosError) {
		// case 'ERR_BAD_REQUEST':
		// 	throw new Error();
		// case exceptionsClient.BusinessGenericException:
		// 	throw new Error();
		// case exceptionsClient.EntityNotFoundException:
		// 	if (showDebugGlobal) {
		// 		showToastError(responseError.message);
		// 	}
		// 	break;
		// case exceptionsClient.AuthenticationException:
		// 	showToastError(responseError.type);
		// 	break;
		// case exceptionsClient.BadCredentialsException:
		// 	showToastError(responseError.message);
		// 	throw new Error();
		// case exceptionsClient.MethodArgumentNotValidException:
		// 	showToastError(responseError.message);
		// 	throw new Error();
		// case exceptionsClient.RequestDataInvalidException:
		// 	showToastError(responseError.message);
		// 	throw new Error();
		// case exceptionsClient.TokenAuthorizationRequestException:
		// 	// 	props.navigate('/not-acess');

		// 	break;
		// case exceptionsClient.ContractsAccessException:
		// 	showErrorDialog({
		// 		message: responseError.message,
		// 		func() {},
		// 	});
		// 	const path = window.location.href;
		// 	const params = path.split('?params=')[1];

		// 	window.location.href = `/contratos?params=${params}`;
		// 	break;
		// case exceptionsClient.TokenInvalidRequestException:
		// 	showErrorDialog({
		// 		message: 'Sua sessão foi desconectada!',
		// 		func() {
		// 			window.location.href = '/login';
		// 		},
		// 	});
		// 	if (showDebugGlobal) {
		// 		showToastError(responseError.type);
		// 	}
		// 	throw new Error();
		// case exceptionsClient.TokenExpiredRequestException:
		// 	return authRefreshHandle({
		// 		err: props.err,
		// 		totalDeRefresh: props.totalDeRefresh,
		// 		useFormData: props.useFormData,
		// 		isRefreshing: props.isRefreshing,
		// 		failedRequestQueue: props.failedRequestQueue,
		// 	});
		default:
			return authRefreshHandle({
				err: props.err,
				totalDeRefresh: props.totalDeRefresh,
				useFormData: props.useFormData,
				isRefreshing: props.isRefreshing,
				failedRequestQueue: props.failedRequestQueue,
			});
		// break;
	}
};
