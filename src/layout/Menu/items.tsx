import { MenuItem } from 'primereact/menuitem';
import { FaProjectDiagram } from 'react-icons/fa';

export const itemsMenu: MenuItem[] = [
	{ label: 'Projetos', url: '/projects', icon: <FaProjectDiagram /> },
	{ label: 'Usuários', url: '/usuarios', icon: 'pi pi-users' },
	{ label: 'Conquistas', url: '/conquistas', icon: 'pi pi-star-fill' },
];
