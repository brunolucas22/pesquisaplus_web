/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'primereact/button';
import { ContextMenu, ContextMenuProps } from 'primereact/contextmenu';
import { MenuItem } from 'primereact/menuitem';
import { useRef } from 'react';

type CrudComponentMenuToolbarProps<Type> = {
	menuItems: MenuItem[];
	rowsSelectes: Type[];
};

export function CrudComponentMenuToolbar<Type>({
	...props
}: CrudComponentMenuToolbarProps<Type>) {
	const menuRef = useRef<ContextMenuProps | any>(null);

	return (
		<>
			<ContextMenu model={props.menuItems} ref={menuRef} />
			<Button
				icon="pi pi-ellipsis-v"
				className="p-button-text"
				aria-label="opções"
				onClick={(e) => {
					if (menuRef.current == null) return;
					menuRef.current.show(e);
				}}
			/>
		</>
	);
}
