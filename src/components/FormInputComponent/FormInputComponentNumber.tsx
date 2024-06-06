/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCrudComponentMode } from '@src/store/ducks/CrudComponentMode';
import { EnumCrudComponentMode } from '@src/utils/enums/enumCrudComponentMode';
import { InputNumber } from 'primereact/inputnumber';
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

type FormInputComponentNumberProps<Interface extends FieldValues> = {
	readOnly?: boolean;
	control: Control<Interface, any>;
	keyField: Path<Interface>;
	errors: FieldErrors<Interface>;
	className?: string;
	label?: string;
	placehoder?: string;
	icon?: string | JSX.Element;
	currency?: boolean;
	rules?: Omit<
		RegisterOptions<Interface, Path<Interface>>,
		'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
	>;
};

export function FormInputComponentNumber<Interface extends FieldValues>({
	...props
}: FormInputComponentNumberProps<Interface>) {
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
								<InputNumber
									disabled={
										props.readOnly ||
										crudComponentMode === EnumCrudComponentMode.info
									}
									className="w-full"
									name={props.keyField}
									placeholder={props.placehoder || props.label}
									inputId={props.keyField}
									value={value}
									onChange={(e) => {
										onChange(e.value);
									}}
									{...(props.currency
										? {
												mode: 'currency',
												currency: 'BRL',
												locale: 'pt-BR',
										  }
										: { useGrouping: false })}
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
