import FormInputComponent from '@src/components/FormInputComponent';
import { Dispatch, SetStateAction } from 'react';
import { GiDuration } from 'react-icons/gi';

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
				required={true}
				register={props.register('name_project', { required: true })}
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
				register={props.register('description_project', { required: true })}
			/>
		</div>
	);
};
