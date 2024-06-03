import { useGlobalLoadingActive } from '@src/store/ducks/GlobalLoadingActive';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useSelector } from 'react-redux';
import './style.scss';

export const GlobalLoalding = () => {
	const excludedQueryKeys: string[] = [];
	const excludedMutationsKeys: string[] = [];
	const activeLoading = useSelector(useGlobalLoadingActive);

	const predicate = (exclude: Array<string>, keys: Array<string>) => {
		const set1 = new Set(exclude);
		for (const key of keys) {
			if (set1.has(key)) {
				return false;
			}
		}
		return true;
	};

	const sum =
		useIsFetching({
			predicate: (key) =>
				predicate(excludedQueryKeys, key.queryKey as Array<string>),
		}) +
		useIsMutating({
			predicate: (key) =>
				predicate(
					excludedMutationsKeys,
					key.options.mutationKey as Array<string>
				),
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
