import { EnumMatchMode } from '@src/utils/enums/enumMatchMode';

export interface IFilterTableConfig {
	field: string;
	value: string;
	matchMode: EnumMatchMode;
}

export interface ITableConfig {
	page?: number;
	sortField?: string;
	sortOrder?: 0 | 1 | -1 | null | undefined;
	filters?: IFilterTableConfig[];
}

export interface IResponseListDTO<Type> {
	data: Type[];
	totalElements: number;
}
