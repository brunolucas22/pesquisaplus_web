// /* eslint-disable no-case-declarations */
// import { showToastError } from '@components/GlobalToast';
// import { showErrorDialog } from 'src/components/DialogComponent/hooks';

// import { authAnonymousRefreshHandle, authRefreshHandle } from './exceptions';
// import { exceptionsClient, exceptionsService } from './exeptionsKeys';

// const showDebugGlobal = import.meta.env.VITE_SHOW_DEBUG_GLOBAL === 'true';
// export const serverErrorHandle = async (responseError: any) => {
// 	const errorMessage = responseError.message;
// 	if (!showDebugGlobal) console.log({ responseError });

// 	switch (responseError.type) {
// 		case exceptionsService.DataIntegrityViolationException:
// 			showToastError(responseError.message);
// 			throw new Error(errorMessage);
// 		case exceptionsService.Exception:
// 			if (showDebugGlobal) {
// 				showToastError(responseError.type);
// 			}
// 			throw new Error(errorMessage);
// 		case exceptionsService.MappingException:
// 			if (showDebugGlobal) {
// 				showToastError(responseError.type);
// 			}
// 			throw new Error(errorMessage);
// 		case exceptionsService.PropertyReferenceException:
// 			if (showDebugGlobal) {
// 				showToastError(responseError.type);
// 			}
// 			throw new Error(errorMessage);
// 		case exceptionsService.SessionExpiredException:
// 			showErrorDialog({
// 				message: responseError.message,
// 				func() {
// 					window.location.href = '/login';
// 				},
// 			});
// 			throw new Error(errorMessage);
// 		case exceptionsService.RuntimeException:
// 			showErrorDialog({
// 				message: responseError.message,
// 				func() {
// 					window.location.href = '/login';
// 				},
// 			});
// 			throw new Error(errorMessage);
// 		default:
// 			let error = '';
// 			if (showDebugGlobal) error = `?error=${JSON.stringify(responseError)}`;
// 			window.location.href = `/login${error}`;
// 	}
// };
// export const clientErrorHandle = async (
// 	err: any,
// 	totalDeRefresh: number,
// 	navigate: any,
// 	useFormData?: boolean,
// 	mode?: 'normal' | 'anonymous',
// 	isRefreshing?: boolean,
// 	failedRequestQueue?: any[]
// ) => {
// 	const responseError: any = err.response.data.ResponseErrorDTO;
// 	if (!showDebugGlobal) console.log({ responseError });
// 	switch (responseError.type) {
// 		case exceptionsClient.BusinessTokenInvalidRequestException:
// 			throw new Error();
// 		case exceptionsClient.BusinessGenericException:
// 			throw new Error();
// 		case exceptionsClient.EntityNotFoundException:
// 			if (showDebugGlobal) {
// 				showToastError(responseError.message);
// 			}
// 			break;
// 		case exceptionsClient.AuthenticationException:
// 			showToastError(responseError.type);
// 			break;
// 		case exceptionsClient.BadCredentialsException:
// 			showToastError(responseError.message);
// 			throw new Error();
// 		case exceptionsClient.MethodArgumentNotValidException:
// 			showToastError(responseError.message);
// 			throw new Error();
// 		case exceptionsClient.RequestDataInvalidException:
// 			showToastError(responseError.message);
// 			throw new Error();
// 		case exceptionsClient.TokenAuthorizationRequestException:
// 			if (mode === 'normal') {
// 				navigate('/not-acess');
// 			} else if (mode === 'anonymous') {
// 				throw new Error();
// 			}
// 			break;
// 		case exceptionsClient.ContractsAccessException:
// 			showErrorDialog({
// 				message: responseError.message,
// 				func() {},
// 			});
// 			const path = window.location.href;
// 			const params = path.split('?params=')[1];

// 			navigate(`/contratos?params=${params}`);
// 			break;
// 		case exceptionsClient.TokenInvalidRequestException:
// 			showErrorDialog({
// 				message: 'Sua sessão foi desconectada!',
// 				func() {
// 					window.location.href = '/login';
// 				},
// 			});
// 			if (showDebugGlobal) {
// 				showToastError(responseError.type);
// 			}
// 			throw new Error();
// 		case exceptionsClient.TokenExpiredRequestException:
// 			if (mode === 'anonymous') return authAnonymousRefreshHandle(err);
// 			else
// 				return authRefreshHandle(
// 					err,
// 					totalDeRefresh,
// 					useFormData,
// 					isRefreshing,
// 					failedRequestQueue
// 				);
// 		default:
// 			showToastError(responseError.message);
// 			break;
// 	}
// };
