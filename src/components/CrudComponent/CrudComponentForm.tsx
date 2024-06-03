/* eslint-disable @typescript-eslint/no-explicit-any */

import {
	TCrudComponentMode,
	setCrudComponentMode,
	useCrudComponentMode,
} from '@src/store/ducks/CrudComponentMode';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FieldValues, UseFormReturn, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

type CrudComponentFormFormProps<Type extends FieldValues> = {
	rowSelected?: Type;
	setRowSelected?: Dispatch<SetStateAction<Type | undefined>>;
} & UseFormReturn<Type, any, undefined>;

type CrudComponentFormProps<Type extends FieldValues> = {
	rowSelected?: Type;
	setRowSelected?: Dispatch<SetStateAction<Type | undefined>>;
	onSubmit: (data: Type) => Promise<void> | void;
	form?: ({ ...props }: CrudComponentFormFormProps<Type>) => JSX.Element;
};

export function CrudComponentForm<Type extends FieldValues>({
	...props
}: CrudComponentFormProps<Type>) {
	const crudComponentMode = useSelector(useCrudComponentMode);
	const dispatch = useDispatch();

	const hookForm = useForm<Type>();

	useEffect(() => {
		if (props.rowSelected) {
			hookForm.reset(props.rowSelected);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.rowSelected]);

	return (
		<Sidebar
			className="w-12 sm:w-6"
			visible={
				crudComponentMode === TCrudComponentMode.add ||
				crudComponentMode === TCrudComponentMode.edit
			}
			position="right"
			onHide={() => {
				dispatch(setCrudComponentMode(TCrudComponentMode.search));
				props.setRowSelected && props.setRowSelected(undefined);
			}}
		>
			<form
				onSubmit={hookForm.handleSubmit(async (data) => {
					await props.onSubmit(data);
					dispatch(setCrudComponentMode(TCrudComponentMode.search));
					props.setRowSelected && props.setRowSelected(undefined);
				})}
				className="w-full h-full flex flex-column justify-content-between"
			>
				<div className="flex flex-column w-full h-11 overflow-y-auto">
					{props.form &&
						props.form({
							rowSelected: props.rowSelected,
							setRowSelected: props.setRowSelected,
							...hookForm,
						})}
				</div>
				{crudComponentMode !== TCrudComponentMode.info && (
					<div className="mt-2 flex justify-content-center gap-2 w-full">
						<Button
							label={
								crudComponentMode !== TCrudComponentMode.add
									? 'Cadastrar'
									: 'Salvar'
							}
							className="w-full"
							severity="success"
						/>
						<Button
							severity="warning"
							type="button"
							label="Limpar"
							className="w-full"
							onClick={() => {
								hookForm.reset();
							}}
						/>

						<Button
							severity="danger"
							className="w-full"
							onClick={() => {
								dispatch(setCrudComponentMode(TCrudComponentMode.search));
								props.setRowSelected && props.setRowSelected(undefined);
							}}
							type="button"
							label={'Cancelar'}
						/>
					</div>
				)}
			</form>
		</Sidebar>
	);
}
