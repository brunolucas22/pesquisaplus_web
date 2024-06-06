/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCrudComponentMode } from '@src/store/ducks/CrudComponentMode';
import { EnumCrudComponentMode } from '@src/utils/enums/enumCrudComponentMode';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { FieldErrors, FieldValues, Path } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { ErrorMessageFormComponent } from '../ErrorMessageFormComponent';

type FormInputComponentTextProps<Interface extends FieldValues> = {
	isTextarea?: boolean;
	keyField: Path<Interface>;
	errors: FieldErrors<Interface>;
	className?: string;
	label?: string;
	placehoder?: string;
	icon?: string | JSX.Element;
	register: any;
	required?: boolean;
	readOnly?: boolean;
};

export function FormInputComponentText<Interface extends FieldValues>({
	...props
}: FormInputComponentTextProps<Interface>) {
	const crudComponentMode = useSelector(useCrudComponentMode);

	return (
		<div
			className={classNames(
				props.className,
				'w-full flex flex-column align-items-start'
			)}
		>
			{props.label && (
				<label
					htmlFor={props.keyField}
					className="font-bold block mb-2 text-color"
				>
					{props.label}{' '}
					{props.required && <span className="text-red-500">*</span>}
				</label>
			)}
			<div
				className={classNames(
					{
						'mb-3': !props.errors[`${props.keyField}`],
					},
					'flex p-inputgroup flex-1 '
				)}
			>
				<span className="p-inputgroup-addon">
					{props.icon &&
						(typeof props.icon === 'string' ? (
							<i className={`pi ${props.icon}`} />
						) : (
							props.icon
						))}
				</span>
				{props.isTextarea ? (
					<InputTextarea
						autoResize
						id={props.keyField}
						placeholder={props.placehoder || props.label}
						className={classNames(
							{
								'p-invalid': props.errors[`${props.keyField}`],
							},
							'border-round-right'
						)}
						disabled={
							props.readOnly || crudComponentMode === EnumCrudComponentMode.info
						}
						{...props.register}
					/>
				) : (
					<InputText
						id={props.keyField}
						placeholder={props.placehoder || props.label}
						className={classNames({
							'p-invalid': props.errors[`${props.keyField}`],
						})}
						disabled={
							props.readOnly || crudComponentMode === EnumCrudComponentMode.info
						}
						{...props.register}
					/>
				)}
			</div>
			<ErrorMessageFormComponent error={props.errors[`${props.keyField}`]} />
		</div>
	);
}
