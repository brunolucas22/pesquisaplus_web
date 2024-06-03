type CrudComponentRootProps = {
	children: JSX.Element[] | JSX.Element;
};

export const CrudComponentRoot = ({ ...props }: CrudComponentRootProps) => {
	return (
		<div className="flex flex-column h-screen w-full max-w-full max-h-full p-3 overflow-auto">
			{props.children}
		</div>
	);
};
