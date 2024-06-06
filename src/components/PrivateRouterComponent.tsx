import { Navigate } from 'react-router-dom';

type PrivateRouteComponentProps = {
	children: JSX.Element;
};

export const PrivateRouteComponent = ({
	children,
}: PrivateRouteComponentProps) => {
	const token = sessionStorage.getItem('LoginResponseDTO');

	return token ? children : <Navigate to="/login" />;
};
