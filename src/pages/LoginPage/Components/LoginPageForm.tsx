import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { NavLink, To, useNavigate } from 'react-router-dom';
import logo from '../../../Assets/images/logo_black.png';
import { ErrorMessageFormComponent } from '../../../components/ErrorMessageFormComponent';
import '../LoginPage.scss';
import { postLogin } from '../Services';

export const LoginPageForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
	} = useForm();

	const { mutateAsync: onPost } = postLogin();

	const navigate = useNavigate();

	const onSubmit = async (data: FieldValues) => {
		try {
			await onPost(
				{
					data: { ...data },
				},
				{
					onSuccess: () => {
						navigate('/', { replace: true });
					},
				}
			);
		} catch (err) {
			return console.log(err);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card
				footer={
					<h6 className="m-0 text-center">
						{'Desenvolvido por <PesquisaPlus />'}{' '}
					</h6>
				}
				className=" border-round-lg flex flex-column align-items-center justify-content-center sm:w-23rem w-full"
			>
				<div className="flex flex-column justify-content-center align-items-center ">
					<img alt="logo black" src={logo} width={150} />
					<h4 className="m-0 mt-3 text-color hidden sm:block">
						Um plus na sua produção!
					</h4>
					<Divider className="m-0 my-3" />
				</div>

				<div
					className={classNames(
						{
							'mb-3': !errors.email_usuario,
						},
						'flex p-inputgroup flex-1 '
					)}
				>
					<span className="p-inputgroup-addon">
						<i className="pi pi-user"></i>
					</span>
					<InputText
						placeholder="E-mail"
						className={classNames({
							'p-invalid': errors.email_usuario,
						})}
						{...register('email_usuario', {
							required: true,
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
								message: 'Digite um Endereço de E-mail Válido',
							},
						})}
					/>
				</div>

				<ErrorMessageFormComponent error={errors.email_usuario} />
				<Controller
					name="senha_usuario"
					rules={{ required: true }}
					control={control}
					render={({ field }) => (
						<div
							className={classNames(
								{
									'mb-3': !errors.senha_usuario,
								},
								'flex p-inputgroup flex-1 '
							)}
						>
							<span className="p-inputgroup-addon">
								<i className="pi pi-lock"></i>
							</span>
							<Password
								{...field}
								toggleMask
								feedback={false}
								placeholder="Senha"
								inputClassName={classNames({
									'p-invalid': errors.senha_usuario,
								})}
							/>
						</div>
					)}
				/>

				<ErrorMessageFormComponent error={errors.senha_usuario} />

				<Button label="Logar" className="w-full" />

				<Divider className="m-0 my-3 text-xs" align="center">
					OU
				</Divider>
				<div className="flex flex-row text-xs text justify-content-between ">
					<NavLink className={'login-link '} to={'/' as To}>
						Esqueci Minha Senha.
					</NavLink>
					<NavLink className={'login-link '} to={'/' as To}>
						Cadastrar-me.
					</NavLink>
				</div>
				<Divider className="m-0 my-3 text-xs" align="center">
					Nossas Redes Sociais
				</Divider>
				<div className="flex flex-row text-xs text justify-content-evenly ">
					<FaYoutube
						className="cursor-pointer"
						size={30}
						onClick={() =>
							window.open('https://www.youtube.com/@PesquisaPlus', '_blank')
						}
					/>
					<FaFacebook size={30} className="cursor-pointer" />
					<FaInstagram
						className="cursor-pointer"
						size={30}
						onClick={() =>
							window.open('https://www.instagram.com/pesquisa.plus/', '_blank')
						}
					/>
				</div>
			</Card>
		</form>
	);
};
