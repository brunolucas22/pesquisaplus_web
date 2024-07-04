/* eslint-disable react-refresh/only-export-components */

import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
// import { PrivateRouteComponent } from '../components/PrivateRouterComponent';

const UserPage = lazy(() => import('../pages/UserPage'));
const ProjectsPage = lazy(() => import('../pages/ProjectPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const ConquistasPage = lazy(() => import('../pages/ConquistasPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));

export const router = createBrowserRouter([
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/',
		element: (
			// <PrivateRouteComponent>
			<App />
			// </PrivateRouteComponent>
		),
		children: [
			{
				path: '/projects/*',
				element: <ProjectsPage />,
			},
			{
				path: '/user/*',
				element: <UserPage />,
			},
			{
				path: '/conquistas/*',
				element: <ConquistasPage />,
			},
		],
	},
	{
		path: '/*',
		element: <NotFoundPage />,
	},
]);
