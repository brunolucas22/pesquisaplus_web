/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
	setCrudComponentMode,
	useCrudComponentMode,
} from '@src/store/ducks/CrudComponentMode';
import { EnumCrudComponentMode } from '@src/utils/enums/enumCrudComponentMode';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FieldValues, Path, UseFormReturn, useForm } from 'react-hook-form';
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

	const visibility: () => boolean = () => {
		switch (crudComponentMode) {
			case EnumCrudComponentMode.edit:
				return true;
			case EnumCrudComponentMode.info:
				return true;
			case EnumCrudComponentMode.add:
				return true;
			default:
				return false;
		}
	};

	const visible = visibility();

	const FormInterceptor = () => {
		const hookForm = useForm<Type>();

		const reset = (values?: Type) => {
			Object.entries(values ?? hookForm.getValues()).map(([key, value]) => {
				hookForm.setValue(key as Path<Type>, values ? value : undefined);
			});
		};
		useEffect(() => {
			reset(props.rowSelected);
			return () => {
				hookForm.reset();
			};
		}, [visible === true, props.rowSelected]);

		return (
			<form
				autoComplete="off"
				onSubmit={hookForm.handleSubmit((e) => {
					props.onSubmit(e);
					dispatch(setCrudComponentMode(EnumCrudComponentMode.search));
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
				{crudComponentMode !== EnumCrudComponentMode.info && (
					<div className="mt-2 flex justify-content-center gap-2 w-full">
						<Button
							label={
								crudComponentMode === EnumCrudComponentMode.add
									? 'Cadastrar'
									: 'Salvar'
							}
							className="w-full"
							severity="success"
						/>
						{crudComponentMode === EnumCrudComponentMode.add && (
							<Button
								severity="warning"
								type="button"
								label="Limpar"
								className="w-full"
								onClick={() => {
									reset(undefined);
								}}
							/>
						)}

						<Button
							severity="danger"
							className="w-full"
							onClick={() => {
								dispatch(setCrudComponentMode(EnumCrudComponentMode.search));
								props.setRowSelected && props.setRowSelected(undefined);
							}}
							type="button"
							label={'Cancelar'}
						/>
					</div>
				)}
			</form>
		);
	};

	const Form = FormInterceptor();

	return (
		<Sidebar
			className="w-12 sm:w-6"
			visible={visible}
			position="right"
			onHide={() => {
				dispatch(setCrudComponentMode(EnumCrudComponentMode.search));
				props.setRowSelected && props.setRowSelected(undefined);
			}}
		>
			{visible && Form}
		</Sidebar>
	);
}
