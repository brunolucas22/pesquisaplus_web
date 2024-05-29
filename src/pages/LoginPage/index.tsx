// import logo from '../../Assets/images/logo_black.png';
import { LoginPageForm } from './Components/LoginPageForm';
import './LoginPage.scss';

const LoginPage = () => {
	return (
		<div className="w-screen h-screen flex login-container justify-content-center align-items-center">
			<LoginPageForm />
		</div>
	);
};

export default LoginPage;
