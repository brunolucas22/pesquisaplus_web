/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonFile } from '@src/components/ButtonFile';
import 'cropperjs/dist/cropper.css';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { ChangeEvent, useState } from 'react';
import {
	Control,
	Controller,
	FieldErrors,
	FieldValues,
	Path,
	RegisterOptions,
} from 'react-hook-form';
import { ErrorMessageFormComponent } from '../../ErrorMessageFormComponent';
import { FormInputComponentCropperDialog } from './FormInputComponentCropperDialog';
import './style.scss';

type FormInputComponentPhotoProps<Interface extends FieldValues> = {
	readOnly?: boolean;
	control: Control<Interface, any>;
	keyField: Path<Interface>;
	errors: FieldErrors<Interface>;
	className?: string;
	label?: string;
	placehoder?: string;
	icon?: string | JSX.Element;
	rules?: Omit<
		RegisterOptions<Interface, Path<Interface>>,
		'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
	>;
};

export function FormInputComponentPhoto<Interface extends FieldValues>({
	...props
}: FormInputComponentPhotoProps<Interface>) {
	const [cropperVisible, setCropperVisible] = useState<boolean>(false);
	const [imagemCompleta, setImagemCompleta] = useState<any>();

	const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
		console.log('não entrou no if');
		if (event.target.files && event.target.files.length > 0) {
			console.log('entrou no if');
			const reader = new FileReader();
			reader.onload = () => {
				console.log('loa');
				setImagemCompleta(reader.result);
				setCropperVisible(true);
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	};

	return (
		<div className={classNames(props.className, 'w-full flex flex-column')}>
			<Controller
				control={props.control}
				name={props.keyField}
				rules={props.rules}
				render={({ field: { value, onChange } }) => {
					return (
						<div className="flex flex-column w-full align-items-start">
							<FormInputComponentCropperDialog<Interface>
								isVisible={cropperVisible}
								value={imagemCompleta}
								setIsVisisible={setCropperVisible}
								onSave={(e) => {
									onChange(e);
								}}
							/>
							{props.label && (
								<label
									htmlFor={props.keyField}
									className="font-bold block mb-2 text-color"
								>
									{props.label}{' '}
									{props.rules?.required && (
										<span className="text-red-500">*</span>
									)}
								</label>
							)}
							<div
								className={classNames(
									{
										'mb-3': !props.errors[`${props.keyField}`],
									},
									'flex p-inputgroup flex-1 flex-column'
								)}
							>
								<div className="w-full flex flex-column align-items-center ">
									<div className="w-11rem h-11rem surface-100 border-1 border-round-lg flex justify-content-center align-items-center">
										{value ? (
											<img
												onClick={() => {
													setCropperVisible(true);
												}}
												alt={props.label}
												src={value}
												className="w-10rem border-round-lg min-w-10rem max-w-10rem h-10rem min-h-10rem max-h-10rem"
											/>
										) : (
											<i style={{ fontSize: '8rem' }} className="pi pi-user " />
										)}
									</div>

									<span className="w-full flex flex-row justify-content-center gap-2 mt-3">
										<ButtonFile
											onChange={(e) => onSelectFile(e)}
											className="w-4"
											label="Escolher Foto do Perfil"
										/>

										<Button
											disabled={!value}
											type="button"
											onClick={() => {
												onChange(undefined);
												setImagemCompleta(undefined);
											}}
											label="Remover Foto do Perfil"
											severity="danger"
											className="w-4"
										/>
									</span>
								</div>
							</div>
						</div>
					);
				}}
			/>
			<ErrorMessageFormComponent error={props.errors[`${props.keyField}`]} />
		</div>
	);
}
