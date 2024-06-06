/* eslint-disable @typescript-eslint/no-explicit-any */
import { api, apiFormData } from '@config/axios';
import { queryClient } from '@config/queryClient';

import { setGlobalLoadingActive } from '@src/store/ducks/GlobalLoadingActive';
import {
	UseMutationOptions,
	UseQueryOptions,
	UseQueryResult,
	useMutation,
	useQuery,
} from '@tanstack/react-query';
import { AxiosInstance, AxiosProgressEvent } from 'axios';
import { useDispatch } from 'react-redux';
import { ITableConfig } from './useTableConfig/interface';

export type TFormatResponseFunction = <TDataResponse, TFormatResponse>(
	data: TDataResponse
) => TFormatResponse;

export interface IFormatResponse<TResponse, TFormatter> {
	formatResponse?: (data: TResponse) => TFormatter;
	axios?: AxiosInstance;
}

export type TUseQueryTyped<TParams, TResponse> = <TFormatter = TResponse>(
	params?: TParams,
	options?: UseQueryOptions,
	restEndpoint?: string
) => UseQueryResult<TFormatter>;

export interface IUseService {
	key: string[];
	baseUrl: string;
}

export interface IUseMutationsParams<T> {
	data?: T;
	queryParams?: T;
	restEndpoint?: string;
	useBarRestEndpoint?: boolean;
	onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

export function useService({ key, baseUrl }: IUseService) {
	function useGetTableAll<TDataResponse>(
		params: ITableConfig,
		options?: UseQueryOptions<unknown, unknown, unknown, string[]>,
		restEndpoint?: string
	) {
		const dispatch = useDispatch();
		return useQuery<any, any, any, any[]>(
			{
				...options,
				queryKey: [...key, ...(options?.queryKey ?? []), params],
				queryFn: async () => {
					const url = restEndpoint ? `${baseUrl}${restEndpoint}` : baseUrl;
					let response: boolean;

					const timeoutPromise = new Promise<null>(() => {
						const timeoutId = setTimeout(() => {
							if (!response) {
								dispatch(setGlobalLoadingActive(true));
							}
						}, 1000);

						return () => clearTimeout(timeoutId);
					});

					try {
						const result = await Promise.race([
							api.post<TDataResponse>(url, params),
							timeoutPromise,
						]);

						if (result) {
							response = true;
							dispatch(setGlobalLoadingActive(false));
							console.log('oxe');
							return result.data;
						}
					} catch (error) {
						dispatch(setGlobalLoadingActive(false));
						console.error({ error });
					}
				},
			},
			queryClient
		);
	}

	function useGet<TDataResponse>(
		restEndpoint: string,
		options?: UseQueryOptions<unknown, unknown, unknown, string[]>,
		timeout?: number
	) {
		return useQuery<any, any, any, string[]>(
			{
				...options,
				queryKey: key,
				queryFn: async () => {
					const url = restEndpoint ? `${baseUrl}${restEndpoint}` : baseUrl;
					const result = await api.get<TDataResponse>(url, { timeout });
					return result?.data;
				},
			},
			queryClient
		);
	}

	function usePost<TPayloadPost>(
		options?: UseMutationOptions<
			unknown,
			unknown,
			IUseMutationsParams<TPayloadPost>
		>,
		timeout?: number
	) {
		return useMutation({
			...options,
			mutationFn: async ({
				data,
				queryParams,
				restEndpoint,
				onUploadProgress,
			}: IUseMutationsParams<TPayloadPost>) => {
				const url = restEndpoint ? `${baseUrl}${restEndpoint}` : baseUrl;
				return await api.post(url, data ?? undefined, {
					params: queryParams ?? null,
					timeout,
					onUploadProgress,
				});
			},
			onSuccess: (data) => {
				if (!data) return Promise.reject('Resposta Inválida');
				queryClient.invalidateQueries({ queryKey: key });
			},
			mutationKey: [options?.mutationKey ?? key],
		});
	}

	function usePostFormData<TPayloadPost>(
		options?: UseMutationOptions<
			unknown,
			unknown,
			IUseMutationsParams<TPayloadPost>
		>,
		timeout?: number
	) {
		return useMutation({
			...options,
			mutationFn: async ({
				data,
				onUploadProgress,
				queryParams,
				restEndpoint,
			}: IUseMutationsParams<TPayloadPost>) => {
				const url = restEndpoint ? `${baseUrl}${restEndpoint}` : baseUrl;
				return await apiFormData.post(url, data ?? undefined, {
					onUploadProgress,
					params: queryParams ?? null,
					timeout,
				});
			},
			onSuccess: (data) => {
				if (!data) return Promise.reject('Resposta Inválida');
				queryClient.invalidateQueries({ queryKey: key });
			},
			retry: options?.retry ?? 1,
			mutationKey: [options?.mutationKey ?? key],
		});
	}

	function usePut<TPayloadPut>(
		options?: UseMutationOptions<
			unknown,
			unknown,
			IUseMutationsParams<TPayloadPut>
		>
	) {
		return useMutation({
			...options,
			mutationFn: async ({
				data,
				restEndpoint,
				queryParams,
			}: IUseMutationsParams<TPayloadPut>) => {
				const url = restEndpoint ? `${baseUrl}${restEndpoint}` : baseUrl;
				return await api.put(url, data ?? undefined, {
					params: queryParams ?? null,
				});
			},
			onSuccess: (data) => {
				if (!data) return Promise.reject('Resposta Inválida');
				queryClient.invalidateQueries({ queryKey: key });
			},
			mutationKey: [options?.mutationKey ?? key],
		});
	}

	function usePatch<TPayloadPut>(
		options?: UseMutationOptions<
			unknown,
			unknown,
			IUseMutationsParams<TPayloadPut>
		>
	) {
		return useMutation({
			...options,
			mutationFn: async ({
				data,
				restEndpoint,
				queryParams,
			}: IUseMutationsParams<TPayloadPut>) => {
				const url = restEndpoint ? `${baseUrl}${restEndpoint}` : baseUrl;
				return await api.patch(url, data ?? undefined, {
					params: queryParams ?? null,
				});
			},
			onSuccess: (data) => {
				if (!data) return Promise.reject('Resposta Inválida');
				queryClient.invalidateQueries({ queryKey: key });
			},
			mutationKey: [options?.mutationKey ?? key],
		});
	}

	function useDelete<TPayloadDelete>(
		options?: UseMutationOptions<
			unknown,
			unknown,
			Omit<IUseMutationsParams<TPayloadDelete>, 'data'>
		>
	) {
		return useMutation({
			...options,
			mutationFn: async ({
				queryParams,
				restEndpoint,
			}: IUseMutationsParams<TPayloadDelete>) => {
				const url = restEndpoint ? `${baseUrl}${restEndpoint}` : baseUrl;
				return await api.delete(url, { params: queryParams ?? null });
			},
			onSuccess: (data) => {
				if (!data) return Promise.reject('Resposta Inválida');
				queryClient.invalidateQueries({ queryKey: key });
			},
			mutationKey: [options?.mutationKey ?? key],
		});
	}

	return {
		useGet,
		usePost,
		usePostFormData,
		usePut,
		useDelete,
		usePatch,
		useGetTableAll,
	};
}
