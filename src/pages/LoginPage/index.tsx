import { useEffect } from 'react';
import { LoginPageForm } from './Components/LoginPageForm';
import './LoginPage.scss';

const LoginPage = () => {
	useEffect(() => {
		sessionStorage.clear();
	}, []);
	return (
		<div className="w-screen h-screen flex login-container justify-content-center align-items-center">
			<LoginPageForm />
		</div>
	);
};

export default LoginPage;
