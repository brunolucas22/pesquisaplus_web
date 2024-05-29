import { Divider } from 'primereact/divider';
import { MenuItem } from 'primereact/menuitem';
import { classNames } from 'primereact/utils';
import { NavLink, To, useLocation } from 'react-router-dom';
import logo from '../../Assets/images/logo_black.png';
import './Drawer.scss';
import './Title.scss';
import { itemsMenu } from './items';

export const MenuLayout = () => {
	const location = useLocation();
	// const displayMenu = useSelector(useMenu);
	// const dispatch = useDispatch();
	// const [displayMenu, setActiveMenu] = useState<boolean>(true);

	return (
		<div className="drawer">
			<div className="flex flex-column justify-content-center align-items-center ">
				<img alt="logo black" src={logo} width={80} />
				<h5 className="m-0 text-color hidden sm:block">
					Um plus na sua produção!
				</h5>
				<Divider className="m-0 mt-2" />
			</div>

			{itemsMenu.map((item: MenuItem) => {
				return (
					<NavLink
						className={'no-underline m-0 p-0'}
						key={item.label}
						style={{ ...item.style }}
						target={item.target}
						to={item.url as To}
					>
						<div
							className={classNames(
								item.className,
								'option-menu  w-full  py-2 pl-5 text-color hover:surface-200  ',
								{
									'p-disabled': item.disabled,
									'surface-100': location.pathname == item.url,
								}
							)}
						>
							<i className={classNames('mr-4 icon-menu', item.icon)}>
								{typeof item.icon !== 'string' && item.icon}
							</i>

							<span className="layout-menuitem-text hidden sm:block">
								{item.label}
							</span>
							{item.items && (
								<i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
							)}
						</div>
					</NavLink>
				);
			})}
		</div>
	);
};
