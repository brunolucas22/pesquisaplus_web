/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'cropperjs/dist/cropper.css';
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

	const onSelectFile = (
		event: ChangeEvent<HTMLInputElement>,
		onChange: any
	) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.onload = () => {
				onChange(reader.result);
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
								value={value}
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
								{value && (
									<img
										onClick={() => {
											setCropperVisible(true);
										}}
										alt="Foto do Perfil"
										src={value}
										className="w-10rem min-w-10rem max-w-10rem h-10rem min-h-10rem max-h-10rem"
									/>
								)}

								<span>
									<div className="custom-file-upload">
										<label
											htmlFor="file-upload"
											className="file-upload-button p-button"
										>
											Escolher arquivo
										</label>
										<input
											id="file-upload"
											className="file-upload-input"
											type="file"
											accept="image/*"
											onChange={(e) => onSelectFile(e, onChange)}
										/>
									</div>
								</span>
							</div>
						</div>
					);
				}}
			/>
			<ErrorMessageFormComponent error={props.errors[`${props.keyField}`]} />
		</div>
	);
}
