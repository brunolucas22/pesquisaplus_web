import CrudComponent from '@src/components/CrudComponent';
import { TColumnsTable } from '@src/components/CrudComponent/CrudComponentTable';
import {
	showErrorDialog,
	showSuccessDialog,
} from '@src/components/DialogComponent/hooks';
import FormInputComponent from '@src/components/FormInputComponent';
import { showToastSuccess } from '@src/components/GlobalToast';
import { useTableConfig } from '@src/hooks/useTableConfig/useTableConfig';
import {
	setCrudComponentMode,
	useCrudComponentMode,
} from '@src/store/ducks/CrudComponentMode';
import { EnumCrudComponentMode } from '@src/utils/enums/enumCrudComponentMode';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaProjectDiagram } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectForm } from './Components/ProjectForm';
import {
	deleteProject,
	getDetailProject,
	getListProject,
	postProject,
	putProject,
} from './Service';
import { IProject } from './interface';

const ProjectsPage = () => {
	const [projetoSelecionado, setProjetoSelecionado] = useState<
		IProject | undefined
	>(undefined);

	const mode = useSelector(useCrudComponentMode);

	const dispatch = useDispatch();
	const { setTableConfig, tableConfig, setFilter } = useTableConfig({});
	const { data } = getListProject(tableConfig);
	const { mutateAsync: onPost } = postProject();
	const { mutateAsync: onPut } = putProject();
	const { mutateAsync: onDelete } = deleteProject();

	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<IProject>();

	const columnsTable: TColumnsTable[] = [
		{ field: 'name_project', header: 'Projeto' },
		{ field: 'start_date_project', header: 'Data Inicial' },
		{ field: 'expected_final_date_project', header: 'Data Final Prevista' },
	];

	const submit = async (data: IProject) => {
		try {
			if (mode === EnumCrudComponentMode.add) {
				await onPost({
					restEndpoint: 'create/',
					data: {
						name_project: data.name_project,
						value_project: data.value_project,
						duration_project: data.duration_project,
						description_project: data.description_project,
						start_date_project: data.start_date_project,
					},
				});

				return;
			}
			if (mode === EnumCrudComponentMode.edit && data && projetoSelecionado) {
				await onPut(
					{
						restEndpoint: `update/${data?.id}/`,
						data: {
							id: data.id,
							name_project: data.name_project,
							value_project: data.value_project,
							duration_project: data.duration_project,
							description_project: data.description_project,
							start_date_project: data.start_date_project,
						},
					},
					{
						onSuccess: () => {
							setProjetoSelecionado(undefined);
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
		<FormInputComponent.Text<IProject>
			errors={errors}
			label="Nome do Projeto"
			keyField="name_project"
			icon={<FaProjectDiagram />}
			required={true}
			register={register('name_project', { required: true })}
		/>,
	];

	const buttonsTable = (projeto: IProject) => {
		const { refetch } = getDetailProject(`${projeto.id}`);
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
					disabled={projeto.status_project}
					labelTooltip={'Finalizar Projeto'}
					icon={'pi pi-check-square'}
					severity="success"
					onClick={async () => {
						showSuccessDialog({
							func: () => {},
							buttonLabel: 'Finalizar',
							cancel: () => {},
							message: 'Deseja Realmente Finalizar Esse Projeto?',
						});
					}}
				/>
				<CrudComponent.Button
					labelTooltip="Visualizar"
					severity="info"
					icon={'pi pi-eye'}
					onClick={async () => {
						refetch().then((response) => {
							setProjetoSelecionado({
								...projeto,
								...(response.data as IProject),
							});
							dispatch(setCrudComponentMode(EnumCrudComponentMode.info));
						});
					}}
				/>
				<CrudComponent.Button
					disabled={projeto.status_project}
					severity="help"
					labelTooltip="Editar"
					icon={'pi pi-pencil'}
					onClick={async () => {
						refetch().then((response) => {
							setProjetoSelecionado({
								...projeto,
								...(response.data as IProject),
							});
							dispatch(setCrudComponentMode(EnumCrudComponentMode.edit));
						});
					}}
				/>
				<CrudComponent.Button
					disabled={projeto.status_project}
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
							message: `Tem Certeza Que Deseja Deletar <b>${projeto.name_project}</b>? <br/> Essa Ação Não Poderá Ser Desfeita.`,
						});
					}}
				/>
			</>
		);
	};

	return (
		<CrudComponent.Root>
			<CrudComponent.Title title={'PROJETOS'}>
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
			<CrudComponent.Form<IProject>
				onSubmit={submit}
				rowSelected={projetoSelecionado}
				setRowSelected={setProjetoSelecionado}
				form={ProjectForm}
			/>

			<CrudComponent.Table<IProject>
				keyTable="id"
				setTableConfig={setTableConfig}
				tableConfig={tableConfig}
				columnsTable={columnsTable}
				responseListDTO={data}
				buttons={buttonsTable}
				rowSelected={projetoSelecionado}
			/>
		</CrudComponent.Root>
	);
};

export default ProjectsPage;
