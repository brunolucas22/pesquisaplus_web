import { Toolbar, ToolbarProps } from 'primereact/toolbar';
import { ReactNode } from 'react';

type CrudComponentToolbarProps = {
	start?: ReactNode | ((props: ToolbarProps) => ReactNode);
	end?: ReactNode | ((props: ToolbarProps) => ReactNode);
};

export const CrudComponentToolbar = ({
	...props
}: CrudComponentToolbarProps) => {
	return (
		<Toolbar start={props.start} end={props.end} className="p-3 my-3 m-0" />
	);
};
