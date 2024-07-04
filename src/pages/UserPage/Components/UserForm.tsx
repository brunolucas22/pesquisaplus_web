/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */
import FormInputComponent from '@src/components/FormInputComponent';
import { Dispatch, SetStateAction } from 'react';

import { UseFormReturn } from 'react-hook-form';
import { IUser } from '../interface';

type UserFormProps = {
	setRowSelected?: Dispatch<SetStateAction<IUser | undefined>>;
	rowSelected?: IUser;
} & UseFormReturn<IUser>;

export const UserForm = ({ ...props }: UserFormProps) => {
	return (
		<div className="flex flex-column">
			<FormInputComponent.Photo<IUser>
				errors={props.formState?.errors}
				label="Nome do Usuário"
				keyField="photo_user"
				control={props.control}
				icon={'pi pi-user'}
			/>
			<FormInputComponent.Text<IUser>
				errors={props.formState?.errors}
				label="Nome do Usuário"
				keyField="name_user"
				icon={'pi pi-user'}
				required
				register={props.register('name_user', { required: true })}
			/>
			<FormInputComponent.Calendar<IUser>
				control={props.control}
				errors={props.formState?.errors}
				keyField="date_birth_user"
				icon={'pi pi-calendar'}
				label="Data de Nascimento"
				placehoder="Data de Nascimento"
				rules={{ required: true }}
			/>
			<FormInputComponent.Text<IUser>
				errors={props.formState?.errors}
				label="CPF do Usuário"
				keyField="cpf_user"
				icon="pi pi-id-card"
				mask={'999.999.999-99'}
				required
				register={props.register('cpf_user', { required: true })}
			/>
			<FormInputComponent.Text<IUser>
				errors={props.formState?.errors}
				label="E-mail do Usuário"
				keyField="email_user"
				icon="pi-at"
				required
				register={props.register('email_user', {
					required: true,
					pattern: {
						value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
						message: 'Digite um Endereço de E-mail Válido.',
					},
				})}
			/>
			<FormInputComponent.Text<IUser>
				errors={props.formState?.errors}
				label="Telefone do Usuário"
				keyField="phone_user"
				icon="pi pi-phone"
				mask={'(99) 99999-9999'}
				required
				register={props.register('phone_user', { required: true })}
			/>
			<FormInputComponent.Dropdown<IUser, any>
				errors={props.formState?.errors}
				label="Tipo de Usuário"
				keyField="type_user"
				icon="pi-shield"
				optionLabel="label"
				optionValue="id"
				control={props.control}
				options={[
					{ id: 1, label: 'Administrador' },
					{ id: 2, label: 'Professor' },
					{ id: 3, label: 'Bolsista/Voluntário' },
				]}
				rules={{ required: true }}
			/>
		</div>
	);
};
