/* eslint-disable react-refresh/only-export-components */

import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { PrivateRouteComponent } from '../components/PrivateRouterComponent';

const UsuariosPage = lazy(() => import('../pages/UsuariosPage'));
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
			<PrivateRouteComponent>
				<App />
			</PrivateRouteComponent>
		),
		children: [
			{
				path: '/usuarios/*',
				element: <UsuariosPage />,
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
