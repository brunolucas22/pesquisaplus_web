/* eslint-disable react-hooks/rules-of-hooks */
import { useService } from '@src/hooks/useService';
import { baseURLs } from '@src/utils/baseUrls';

export const postProject = () => {
	const service = useService({
		key: ['crudProject'],
		baseUrl: baseURLs.project,
	});

	return service.usePost({ mutationKey: ['postProject'] });
};

export const getListProject = () => {
	const service = useService({
		key: ['crudProject'],
		baseUrl: baseURLs.project,
	});

	return service.useGet('', {
		enabled: true,
		queryKey: ['crudProject'],
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
