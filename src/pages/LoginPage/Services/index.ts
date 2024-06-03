/* eslint-disable react-hooks/rules-of-hooks */
import { useService } from '../../../hooks/useService';
import { baseURLs } from '../../../utils/baseUrls';

export const postLogin = () => {
	const service = useService({
		key: ['postLogin'],
		baseUrl: baseURLs.login,
	});

	return service.usePost();
};
