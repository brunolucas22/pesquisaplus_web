/* eslint-disable no-mixed-spaces-and-tabs */
import FormInputComponent from '@src/components/FormInputComponent';
import { Dispatch, SetStateAction } from 'react';
import { GiDuration } from 'react-icons/gi';

import moment from 'moment';
import { UseFormReturn } from 'react-hook-form';
import { FaProjectDiagram } from 'react-icons/fa';
import { IProject } from '../interface';

type ProjectFormProps = {
	setRowSelected?: Dispatch<SetStateAction<IProject | undefined>>;
	rowSelected?: IProject;
} & UseFormReturn<IProject>;

export const ProjectForm = ({ ...props }: ProjectFormProps) => {
	return (
		<div className="flex flex-column">
			<FormInputComponent.Text<IProject>
				errors={props.formState?.errors}
				label="Nome do Projeto"
				keyField="name_project"
				icon={<FaProjectDiagram />}
				required
				register={props.register('name_project', { required: true })}
			/>
			<FormInputComponent.Calendar<IProject>
				control={props.control}
				errors={props.formState?.errors}
				keyField="start_date_project"
				icon={<GiDuration />}
				label="Data de Início do Projeto"
				placehoder="Início do Projeto"
				rules={{ required: true }}
			/>
			<div className="flex md:flex-row flex-column w-full">
				<FormInputComponent.Number<IProject>
					control={props.control}
					errors={props.formState?.errors}
					keyField="value_project"
					className="md:mr-2 mr-0"
					currency
					icon={'pi-dollar'}
					label="Valor do Projeto(Em Reais R$)"
					placehoder="Valor do Projeto"
					rules={{ required: true }}
				/>

				<FormInputComponent.Number<IProject>
					control={props.control}
					errors={props.formState?.errors}
					keyField="duration_project"
					className="md:ml-2 ml-0"
					icon={<GiDuration />}
					label="Duração do Projeto(Em Meses)"
					placehoder="Duração do Projeto"
					rules={{ required: true }}
				/>
			</div>
			<FormInputComponent.Text<IProject>
				errors={props.formState?.errors}
				isTextarea
				label="Descrição do Projeto"
				keyField="description_project"
				icon="pi-file-edit"
				required
				register={props.register('description_project', { required: true })}
			/>
			{props.rowSelected?.status_project && (
				<p className="font-bold block mb-2 text-color">
					{'Projeto Finalizado no Dia: '}
					<span className="text-green-500">
						{props.rowSelected?.final_date_project
							? moment(
									props.rowSelected?.final_date_project,
									'YYYY-MM-DD'
							  ).format('DD/MM/YYYY')
							: props.rowSelected?.expected_final_date_project}
					</span>
				</p>
			)}
		</div>
	);
};
