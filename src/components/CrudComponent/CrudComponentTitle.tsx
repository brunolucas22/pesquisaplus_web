type CrudComponentTitleProps = {
	title: string | JSX.Element;
};
export const CrudComponentTitle = ({ ...props }: CrudComponentTitleProps) => {
	return (
		<div className="flex mb-2 align-items-center">
			<h1 className="mb-0 mr-3">{props.title}</h1>
		</div>
	);
};
