import { Button } from 'primereact/button';

type CrudComponentSearchTableProps = {
	handleFilter: () => void;
	searchs: JSX.Element[];
	clearFilter: () => void;
};

export const CrudComponentSearchTable = ({
	...props
}: CrudComponentSearchTableProps) => {
	return (
		<>
			<div className="card mb-5 mt-2">
				<h4>{props.searchs}</h4>
				<div className="formgroup-inline">
					{props.searchs.map((search: JSX.Element, index: number) => (
						<div className="field" key={index}>
							{search}
						</div>
					))}
					<div
						className="field flex align-items-end"
						style={{ height: '63.2px' }}
					>
						<Button
							label={'Pesquisar'}
							icon="pi pi-search"
							onClick={props.handleFilter}
							style={{ width: '8rem' }}
						/>
					</div>
					<div
						className="field flex align-items-end"
						style={{ height: '63.2px' }}
					>
						<Button
							label={'Limpar'}
							icon="pi pi-eraser"
							onClick={props.clearFilter}
							style={{ width: '8rem' }}
						></Button>
					</div>
				</div>
			</div>
		</>
	);
};
