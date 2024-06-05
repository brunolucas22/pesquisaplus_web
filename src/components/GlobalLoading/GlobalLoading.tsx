/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGlobalLoadingActive } from '@src/store/ducks/GlobalLoadingActive';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useSelector } from 'react-redux';
import './style.scss';

export const GlobalLoalding = () => {
	const excludedQueryKeys: string[] = [];
	const excludedMutationsKeys: string[] = [];
	const activeLoading = useSelector(useGlobalLoadingActive);

	const predicate = (exclude: Array<string>, keys: any[]) => {
		const set1 = new Set(exclude);
		const keysString = keys.filter((key) => typeof key === 'string');
		for (const key of keysString) {
			console.log(key);
			if (set1.has(key)) {
				// || key?.includes('TableCrud')) {
				return false;
			}
		}
		return true;
	};

	const sum =
		useIsFetching({
			predicate: (key) =>
				predicate(excludedQueryKeys, key.queryKey as Array<any>),
		}) +
		useIsMutating({
			predicate: (key) =>
				predicate(excludedMutationsKeys, key.options.mutationKey as Array<any>),
		});

	const isLoading = sum != 0 || activeLoading;

	return (
		<div
			className={`loading ${
				!isLoading ? 'hidden' : 'flex justify-content-center align-items-center'
			} `}
		>
			<div className="flex justify-content-center align-content-center p-2 ">
				<ProgressSpinner />
			</div>
		</div>
	);
};
