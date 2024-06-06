/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTableStateEvent } from 'primereact/datatable';
import { useState } from 'react';
import { IFilterTableConfig, ITableConfig } from './interface';

export const useTableConfig = ({ ...props }: ITableConfig) => {
	const config: ITableConfig = {
		sortField: props?.sortField ?? 'id',
		filters: props?.filters ?? [],
		page: props?.page ?? 0,
		sortOrder: props?.sortOrder ?? 0,
	};

	const [tableConfig, setTableConfig] = useState<ITableConfig>(config);

	const setConfig = (event: DataTableStateEvent) => {
		setTableConfig((prev) => ({
			sortField: event.sortField ?? prev.sortField,
			filters: prev.filters,
			page: event.page ?? prev.page,
			sortOrder: event.sortOrder ?? prev.sortOrder,
		}));
	};

	const transformObjectToArray = (
		filters: Record<string, any>
	): IFilterTableConfig[] => {
		return Object.entries(filters).map(([key, value]) => ({
			field: key,
			value: value,
			matchMode: typeof value === 'string' ? 'CONTAINS' : 'EQUAL',
		}));
	};

	const setFilter = (filters: Record<string, any>) => {
		setTableConfig((prev) => ({
			...prev,
			filters: transformObjectToArray(filters),
		}));
	};

	return {
		tableConfig,
		setTableConfig: setConfig,
		setFilter,
	};
};
