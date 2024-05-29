/* eslint-disable @typescript-eslint/no-explicit-any */
import { compile } from 'path-to-regexp';

export const usePathToUrl = (path: string | number, params: any = {}) => {
	for (const key in params) {
		if (key) {
			const value = params[key];
			params[key] = `${value}`;
		}
	}
	return compile(`${path}`)(params);
};
