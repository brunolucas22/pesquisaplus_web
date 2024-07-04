import CrudComponent from '@src/components/CrudComponent';
import { TColumnsTable } from '@src/components/CrudComponent/CrudComponentTable';
import { showErrorDialog } from '@src/components/DialogComponent/hooks';
import FormInputComponent from '@src/components/FormInputComponent';
import { showToastSuccess } from '@src/components/GlobalToast';
import { useTableConfig } from '@src/hooks/useTableConfig/useTableConfig';
import {
	setCrudComponentMode,
	useCrudComponentMode,
} from '@src/store/ducks/CrudComponentMode';
import { EnumColumnsTableType } from '@src/utils/enums/enumColunsTableType';
import { EnumCrudComponentMode } from '@src/utils/enums/enumCrudComponentMode';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { UserForm } from './Components/UserForm';
import {
	deleteUser,
	getDetailUser,
	getListUser,
	postUser,
	putUser,
} from './Service';
import { IUser } from './interface';

const UserPage = () => {
	const [userSelected, setUserSelected] = useState<IUser | undefined>(
		undefined
	);

	const mode = useSelector(useCrudComponentMode);

	const dispatch = useDispatch();
	const { setTableConfig, tableConfig, setFilter } = useTableConfig({});
	const { data } = getListUser(tableConfig);
	const { mutateAsync: onPost } = postUser();
	const { mutateAsync: onPut } = putUser();
	const { mutateAsync: onDelete } = deleteUser();

	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<IUser>();

	const columnsTable: TColumnsTable[] = [
		{
			field: 'name_user',
			header: 'Usuário',
			type: EnumColumnsTableType.photoAndName,
			aux: 'photo_user',
		},
		{ field: 'cpf_user', header: 'CPF' },
		{ field: 'email_user', header: 'E-mail' },
	];

	const submit = async (data: IUser) => {
		// const file = FormData

		// file.apply('')
		try {
			if (mode === EnumCrudComponentMode.add) {
				await onPost({
					restEndpoint: 'create/',
					data: {
						...data,
					},
				});

				return;
			}
			if (mode === EnumCrudComponentMode.edit && data && userSelected) {
				await onPut(
					{
						restEndpoint: `update/${data?.id}/`,
						data: {
							...data,
						},
					},
					{
						onSuccess: () => {
							setUserSelected(undefined);
						},
					}
				);
				return;
			}
		} catch (err) {
			console.log(err);
			return;
		}
	};

	const handleFilter = handleSubmit((data) => {
		setFilter(data);
	});

	const searchs: JSX.Element[] = [
		<FormInputComponent.Text<IUser>
			errors={errors}
			label="Nome do Usuário"
			keyField="name_user"
			icon={'pi pi-users'}
			required={true}
			register={register('name_user', { required: true })}
		/>,
	];

	const buttonsTable = (projeto: IUser) => {
		const { refetch } = getDetailUser(`${projeto.id}`);
		const remove = async () => {
			await onDelete(
				{
					restEndpoint: `delete/${projeto?.id}/`,
				},
				{
					onSuccess: () => {
						showToastSuccess('Registro Deletado Com Sucesso!');
					},
				}
			);
		};
		return (
			<>
				<CrudComponent.Button
					labelTooltip="Visualizar"
					severity="info"
					icon={'pi pi-eye'}
					onClick={async () => {
						refetch().then((response) => {
							setUserSelected({
								...projeto,
								...(response.data as IUser),
							});
							dispatch(setCrudComponentMode(EnumCrudComponentMode.info));
						});
					}}
				/>
				<CrudComponent.Button
					severity="help"
					labelTooltip="Editar"
					icon={'pi pi-pencil'}
					onClick={async () => {
						refetch().then((response) => {
							setUserSelected({
								...projeto,
								...(response.data as IUser),
							});
							dispatch(setCrudComponentMode(EnumCrudComponentMode.edit));
						});
					}}
				/>
				<CrudComponent.Button
					labelTooltip="Deletar"
					icon={'pi pi-trash'}
					severity="danger"
					onClick={() => {
						showErrorDialog({
							func: async () => {
								remove();
							},
							cancel: () => {},
							buttonLabel: 'Deletar',
							message: `Tem Certeza Que Deseja Deletar <b>${projeto.name_user}</b>? <br/> Essa Ação Não Poderá Ser Desfeita.`,
						});
					}}
				/>
			</>
		);
	};

	return (
		<CrudComponent.Root>
			<CrudComponent.Title title={'USUÁRIOS'}>
				<CrudComponent.Searchbar
					handleFilter={handleFilter}
					searchs={searchs}
					clearFilter={() => {
						reset();
						setFilter({});
					}}
				/>
			</CrudComponent.Title>
			<CrudComponent.Toolbar
				start={
					<CrudComponent.Button
						onClick={() =>
							dispatch(setCrudComponentMode(EnumCrudComponentMode.add))
						}
						label="Adicionar"
					/>
				}
			/>
			<CrudComponent.Form<IUser>
				onSubmit={submit}
				rowSelected={userSelected}
				setRowSelected={setUserSelected}
				form={UserForm}
			/>

			<CrudComponent.Table<IUser>
				keyTable="id"
				setTableConfig={setTableConfig}
				tableConfig={tableConfig}
				columnsTable={columnsTable}
				responseListDTO={data}
				buttons={buttonsTable}
				rowSelected={userSelected}
			/>
		</CrudComponent.Root>
	);
};

export default UserPage;
