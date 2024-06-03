/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column } from 'primereact/column';
import {
	DataTable,
	DataTableSelectionSingleChangeEvent,
} from 'primereact/datatable';
import paginatorTemplate from './CrudComponentPaginatorTemplate';

export type TColumnsTable = {
	field: string;
	header: string;
	type?: string;
};

type CrudComponentTableProps<Type> = {
	columnsTable: TColumnsTable[];
	data: any[];
	rowSelected?: any;
	keyTable: string;
	title?: string;
	setRowSelected?: React.Dispatch<any>;
	buttons?: (rowSelected: Type) => JSX.Element;
	notSelected?: boolean;
};

export function CrudComponentTable<Type>({
	...props
}: CrudComponentTableProps<Type>) {
	const columns = () => {
		return props.columnsTable.map((col, i) => {
			switch (col?.type) {
				default: {
					return (
						<Column
							key={i}
							field={col.field}
							header={col.header}
							sortable
							className="py-2"
							body={(e) => {
								return e[col.field]
									.split('\n')
									.map((line: string, index: number) => {
										const list = e[col.field].split('\n') as Array<any>;
										const isMargin = list.length > 1 && index != 0;
										return (
											<div className={`${isMargin && 'mt-2'}`} key={index}>
												{line}
											</div>
										);
									});
							}}
						/>
					);
				}
			}
		});
	};

	return (
		<div className={`mb-3 w-full`}>
			<DataTable
				emptyMessage={'Nenhum Registro Encontrado.'}
				paginatorTemplate={paginatorTemplate}
				pageLinkSize={10}
				paginatorLeft
				showGridlines
				paginator
				scrollable={true}
				metaKeySelection={false}
				rows={5}
				value={props.data}
				selectionMode={props.notSelected ? undefined : 'single'}
				selection={props.rowSelected}
				onSelectionChange={(e: DataTableSelectionSingleChangeEvent<any>) => {
					props.setRowSelected && props.setRowSelected(e.value);
				}}
				dataKey={props.keyTable}
			>
				{columns()}

				{props.buttons && (
					<Column
						align="center"
						body={(rowSelected) => (
							<div
								className="flex justify-content-center gap-2"
								style={{ minWidth: '80px' }}
							>
								{props.buttons && props.buttons(rowSelected)}
							</div>
						)}
						bodyStyle={{ width: '80px' }}
						header={'Ações'}
					/>
				)}
			</DataTable>
		</div>
	);
}
