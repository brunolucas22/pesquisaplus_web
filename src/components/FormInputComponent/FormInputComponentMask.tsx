/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCrudComponentMode } from '@src/store/ducks/CrudComponentMode';
import { EnumCrudComponentMode } from '@src/utils/enums/enumCrudComponentMode';
import { InputMask } from 'primereact/inputmask';
import { classNames } from 'primereact/utils';
import {
	Control,
	Controller,
	FieldErrors,
	FieldValues,
	Path,
	RegisterOptions,
} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { ErrorMessageFormComponent } from '../ErrorMessageFormComponent';

type FormInputComponentMaskProps<Interface extends FieldValues> = {
	readOnly?: boolean;
	control: Control<Interface, any>;
	keyField: Path<Interface>;
	errors: FieldErrors<Interface>;
	className?: string;
	label?: string;
	placehoder?: string;
	icon?: string | JSX.Element;
	mask?: string;
	rules?: Omit<
		RegisterOptions<Interface, Path<Interface>>,
		'valueAsDate' | 'setValueAs' | 'disabled' | 'valueAsNumber'
	>;
};

export function FormInputComponentMask<Interface extends FieldValues>({
	...props
}: FormInputComponentMaskProps<Interface>) {
	const crudComponentMode = useSelector(useCrudComponentMode);
	return (
		<div className={classNames(props.className, 'w-full flex flex-column')}>
			<Controller
				control={props.control}
				name={props.keyField}
				rules={props.rules}
				render={({ field: { value, onChange } }) => {
					return (
						<div className="flex flex-column w-full align-items-start">
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
									'flex p-inputgroup flex-1'
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
								<InputMask
									disabled={
										props.readOnly ||
										crudComponentMode === EnumCrudComponentMode.info
									}
									mask={props.mask}
									className={classNames(
										{
											'p-invalid': props.errors[`${props.keyField}`],
										},
										'w-full'
									)}
									name={props.keyField}
									placeholder={props.placehoder || props.label}
									id={props.keyField}
									value={value}
									onChange={(e) => {
										onChange(e.value);
									}}
								/>
							</div>
						</div>
					);
				}}
			/>
			<ErrorMessageFormComponent error={props.errors[`${props.keyField}`]} />
		</div>
	);
}
