type CrudComponentTitleProps = {
	title: string | JSX.Element;
	children?: JSX.Element | JSX.Element[];
};
export const CrudComponentTitle = ({ ...props }: CrudComponentTitleProps) => {
	return (
		<div className="card p-3 mb-0 flex flex-column">
			<div className="flex flex-row mb-3 align-items-center">
				<h3 className="m-0 mt-2 text-color">{props.title}</h3>
			</div>
			{props.children && props.children}
		</div>
	);
};
