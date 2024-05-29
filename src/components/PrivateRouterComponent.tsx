import { Navigate } from 'react-router-dom';
import { api } from '../config/axios';

type PrivateRouteComponentProps = {
	children: JSX.Element;
};

export const PrivateRouteComponent = ({
	children,
}: PrivateRouteComponentProps) => {
	const token = api.defaults.headers.common['Authorization'];

	return token ? children : <Navigate to="/login" />;
};
