import { DataTableStateEvent } from 'primereact/datatable';
import { useState } from 'react';
import { ITableConfig } from './interface';

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

	return {
		tableConfig,
		setTableConfig: setConfig,
	};
};
