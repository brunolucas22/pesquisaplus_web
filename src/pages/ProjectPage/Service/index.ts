/* eslint-disable react-hooks/rules-of-hooks */
import { useService } from '@src/hooks/useService';
import { ITableConfig } from '@src/hooks/useTableConfig/interface';
import { baseURLs } from '@src/utils/baseUrls';

export const postProject = () => {
	const service = useService({
		key: ['crudProject'],
		baseUrl: baseURLs.project,
	});

	return service.usePost({ mutationKey: ['postProject'] });
};

export const getListProject = (tableConfig: ITableConfig) => {
	const service = useService({
		key: ['crudProject'],
		baseUrl: baseURLs.project,
	});

	return service.useGetTableAll(tableConfig, {
		enabled: true,
		queryKey: ['TableCrudProject'],
	});
};

export const getDetailProject = (id: string) => {
	const service = useService({
		key: ['crudProject'],
		baseUrl: baseURLs.project,
	});

	return service.useGet(`${id}/`, {
		enabled: false,
		queryKey: ['GetProject'],
	});
};

export const putProject = () => {
	const service = useService({
		key: ['crudProject'],
		baseUrl: baseURLs.project,
	});

	return service.usePut({ mutationKey: ['putProject'] });
};

export const deleteProject = () => {
	const service = useService({
		key: ['crudProject'],
		baseUrl: baseURLs.project,
	});

	return service.useDelete({ mutationKey: ['deleteProject'] });
};
