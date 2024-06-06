import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

type CrudComponentSearchTableProps = {
	handleFilter: () => void;
	searchs: JSX.Element[];
	clearFilter: () => void;
};

export const CrudComponentSearchTable = ({
	...props
}: CrudComponentSearchTableProps) => {
	return (
		<form onSubmit={props.handleFilter}>
			<Toolbar
				className="p-3 py-0"
				start={
					<div className="formgroup-inline ">
						{props.searchs.map((search: JSX.Element, index: number) => (
							<div className="field pt-3" key={index}>
								{search}
							</div>
						))}
					</div>
				}
				end={
					<div className="flex flex-row  gap-2">
						<Button
							tooltip={'Pesquisar'}
							tooltipOptions={{ position: 'top' }}
							icon="pi pi-search"
							severity="success"
						/>
						<Button
							tooltip={'Limpar'}
							tooltipOptions={{ position: 'top' }}
							type="button"
							icon="pi pi-eraser"
							severity="warning"
							onClick={props.clearFilter}
						></Button>
					</div>
				}
			/>
		</form>
	);
};
