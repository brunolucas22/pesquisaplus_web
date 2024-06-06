/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	TCrudComponentMode,
	useCrudComponentMode,
} from '@src/store/ducks/CrudComponentMode';
import moment from 'moment';
import { Calendar } from 'primereact/calendar';
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

type FormInputComponentIntervalProps<Interface extends FieldValues> = {
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

export function FormInputComponentInterval<Interface extends FieldValues>({
	...props
}: FormInputComponentIntervalProps<Interface>) {
	const crudComponentMode = useSelector(useCrudComponentMode);

	const formatDate = (dateArray: any) => {
		const dateStart = moment(dateArray[0]).format('YYYY-MM-DD');
		const dateEnd = moment(dateArray[1]).format('YYYY-MM-DD');
		if (!dateEnd || dateEnd === 'Invalid date') return `${dateStart}`;
		const result = `${dateStart}#${dateEnd}`;
		return result;
	};
	const unformatDate = (dateString: string) => {
		const arrayData = dateString?.split('#');
		if (!arrayData) return undefined;
		const dateStart = moment(arrayData[0], 'YYYY-MM-DD').toDate();
		if (!arrayData[1]) return [dateStart];
		const dateEnd = moment(arrayData[1], 'YYYY-MM-DD').toDate();
		const result = [dateStart, dateEnd];
		return result;
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
								<Calendar
									disabled={
										props.readOnly ||
										crudComponentMode === TCrudComponentMode.info
									}
									value={unformatDate(value)}
									className="w-full md:w-23rem"
									locale="pt_BR"
									dateFormat="dd/mm/yy"
									placeholder={props.placehoder}
									onChange={(e) => {
										onChange(formatDate(e.target.value));
									}}
									selectionMode="range"
									readOnlyInput
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
