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

type FormInputComponentCalendarProps<Interface extends FieldValues> = {
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

export function FormInputComponentCalendar<Interface extends FieldValues>({
	...props
}: FormInputComponentCalendarProps<Interface>) {
	const crudComponentMode = useSelector(useCrudComponentMode);

	const formatDate = (date: any) => {
		const result = `${moment(date).format('YYYY-MM-DD')}`;
		return result;
	};
	const unformatDate = (dateString: string) => {
		const result = moment(dateString, 'YYYY-MM-DD').toDate();
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
