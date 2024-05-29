import { useGlobalLoadingActive } from '@src/store/ducks/GlobalLoadingActive';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useSelector } from 'react-redux';
import './style.scss';

export const GlobalLoalding = () => {
	const excludedQueryKeys: string[] = [];
	const excludedMutationsKeys: string[] = [];
	const activeLoading = useSelector(useGlobalLoadingActive);

	const sum =
		useIsFetching({
			predicate: (key) =>
				!excludedQueryKeys.includes(
					(key.queryKey as Array<string>)[0].toString()
				),
		}) +
		useIsMutating({
			predicate: (key) =>
				!excludedMutationsKeys.includes(
					(key.options.mutationKey as Array<string>)[0].toString()
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
