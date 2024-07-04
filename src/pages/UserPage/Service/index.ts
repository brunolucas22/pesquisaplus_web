/* eslint-disable react-hooks/rules-of-hooks */
import { useService } from '@src/hooks/useService';
import { ITableConfig } from '@src/hooks/useTableConfig/interface';
import { baseURLs } from '@src/utils/baseUrls';

export const postUser = () => {
	const service = useService({
		key: ['crudUser'],
		baseUrl: baseURLs.user,
	});

	return service.usePostFormData({ mutationKey: ['postUser'] });
};

export const getListUser = (tableConfig: ITableConfig) => {
	const service = useService({
		key: ['crudUser'],
		baseUrl: baseURLs.user,
	});

	return service.useGetTableAll(tableConfig, {
		enabled: true,
		queryKey: ['TableCrudUser'],
	});
};

export const getDetailUser = (id: string) => {
	const service = useService({
		key: ['crudUser'],
		baseUrl: baseURLs.user,
	});

	return service.useGet(`${id}/`, {
		enabled: false,
		queryKey: ['GetUser'],
	});
};

export const putUser = () => {
	const service = useService({
		key: ['crudUser'],
		baseUrl: baseURLs.user,
	});

	return service.usePut({ mutationKey: ['putUser'] });
};

export const deleteUser = () => {
	const service = useService({
		key: ['crudUser'],
		baseUrl: baseURLs.user,
	});

	return service.useDelete({ mutationKey: ['deleteUser'] });
};
