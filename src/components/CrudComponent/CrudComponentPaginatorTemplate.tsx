/* eslint-disable @typescript-eslint/no-explicit-any */

const paginatorTemplate = {
	layout:
		'RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
	// RowsPerPageDropdown: (options: any) => {
	// 	// const dropdownOptions = [
	// 	// 	{ label: 5, value: 5 },
	// 	// 	{ label: 10, value: 10 },
	// 	// 	{ label: 20, value: 20 },
	// 	// ];

	// 	return (
	// 		<React.Fragment>
	// 			<span
	// 				className="mx-1"
	// 				style={{
	// 					color: 'var(--text-color)',
	// 					userSelect: 'none',
	// 				}}
	// 			>
	// 				Itens por página:{' '}
	// 			</span>
	// 			<Dropdown
	// 				panelClassName="max-w-2rem"
	// 				aria-label="items por página"
	// 				emptyFilterMessage={'Nenhum Registro Encontrado.'}
	// 				emptyMessage={'Nenhum Registro Encontrado.'}
	// 				value={options.value}
	// 				// options={dropdownOptions}
	// 				onChange={options.onChange}
	// 			/>
	// 		</React.Fragment>
	// 	);
	// },
	CurrentPageReport: (options: any) => {
		return (
			<span
				style={{
					color: 'var(--text-color)',
					userSelect: 'none',
					width: '120px',
					textAlign: 'center',
				}}
			>
				{options.first} - {options.last} de {options.totalRecords}
			</span>
		);
	},
};

export default paginatorTemplate;
