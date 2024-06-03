import CrudComponent from '@src/components/CrudComponent';
import { TColumnsTable } from '@src/components/CrudComponent/CrudComponentTable';
import { showErrorDialog } from '@src/components/DialogComponent/hooks';
import { showToastSuccess } from '@src/components/GlobalToast';
import {
	TCrudComponentMode,
	setCrudComponentMode,
	useCrudComponentMode,
} from '@src/store/ducks/CrudComponentMode';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectForm } from './Components/ProjectForm';
import {
	deleteProject,
	getListProject,
	postProject,
	putProject,
} from './Service';
import { IProject } from './interface';

const ProjectsPage = () => {
	const [projetoSelecionado, setProjetoSelecionado] = useState<IProject>();

	const mode = useSelector(useCrudComponentMode);

	const dispatch = useDispatch();

	const { data } = getListProject();
	const { mutateAsync: onPost } = postProject();
	const { mutateAsync: onPut } = putProject();
	const { mutateAsync: onDelete } = deleteProject();

	const columnsTable: TColumnsTable[] = [
		{ field: 'name_project', header: 'Projeto' },
	];

	const submit = async (data: IProject) => {
		try {
			if (mode === TCrudComponentMode.add) {
				await onPost({
					restEndpoint: 'create/',
					data: {
						...data,
					},
				});

				return;
			}
			if (mode === TCrudComponentMode.edit && data && projetoSelecionado) {
				await onPut(
					{
						restEndpoint: `update/${data?.id}/`,
						data: {
							...data,
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

	const buttonsTable = (projeto: IProject) => {
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
					icon={'pi pi-pencil'}
					onClick={() => {
						setProjetoSelecionado(projeto);
						dispatch(setCrudComponentMode(TCrudComponentMode.edit));
					}}
				/>
				<CrudComponent.Button
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
			<CrudComponent.Title title={'Projetos'} />
			<CrudComponent.Toolbar
				start={
					<CrudComponent.Button
						onClick={() =>
							dispatch(setCrudComponentMode(TCrudComponentMode.add))
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
				columnsTable={columnsTable}
				data={data}
				buttons={buttonsTable}
				rowSelected={projetoSelecionado}
			/>
		</CrudComponent.Root>
	);
};

export default ProjectsPage;
