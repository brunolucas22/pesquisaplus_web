import { Button } from 'primereact/button';
import { MouseEventHandler } from 'react';

type CrudComponentButtonProps = {
	icon?: JSX.Element | string;
	color?: string;
	label?: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
	severity?: 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help';
};

export const CrudComponentButton = ({ ...props }: CrudComponentButtonProps) => {
	return (
		<Button
			icon={props.icon}
			severity={props.severity}
			label={props.label}
			color={props.color}
			onClick={props.onClick}
		/>
	);
};
