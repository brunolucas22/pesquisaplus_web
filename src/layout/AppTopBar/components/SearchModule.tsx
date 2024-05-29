import {
	AutoComplete,
	AutoCompleteCompleteEvent,
} from 'primereact/autocomplete';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { MenuItem } from 'primereact/menuitem';
import { classNames } from 'primereact/utils';
import { useState } from 'react';
import { NavLink, To } from 'react-router-dom';
import { itemsMenu } from '../../Menu/items';

export const SearchModule = () => {
	const [value, setValue] = useState<string>('');
	const [items, setItems] = useState<MenuItem[]>([]);

	const search = (event: AutoCompleteCompleteEvent) => {
		setItems([
			...itemsMenu
				.filter((item) =>
					item.label?.toUpperCase()?.includes(event.query.toUpperCase())
				)
				.map((item: MenuItem) => {
					return item ?? {};
				}),
		]);
	};

	return (
		<IconField iconPosition="left">
			<InputIcon className="pi pi-search" />

			<AutoComplete
				className="m-0"
				value={value}
				itemTemplate={(item: MenuItem) => {
					return (
						<NavLink
							key={item?.label}
							style={item?.style}
							target={item?.target}
							to={item?.url as To}
						>
							<div
								className={classNames(
									item?.className,
									'text-color border-noround '
								)}
							>
								<i
									className={classNames(
										'layout-menuitem-icon mx-2',
										item?.icon
									)}
								>
									{typeof item?.icon !== 'string' && item?.icon}
								</i>
								<span className="layout-menuitem-text">{item?.label}</span>
								{item?.items && (
									<i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
								)}
							</div>
						</NavLink>
					);
				}}
				minLength={3}
				field="label"
				suggestions={items}
				completeMethod={search}
				onChange={(e) => setValue(e.value)}
			/>
		</IconField>
	);
};
