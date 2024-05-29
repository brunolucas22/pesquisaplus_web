/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type ErrorMessageFormComponentProps = {
	error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};

export const ErrorMessageFormComponent = ({
	...props
}: ErrorMessageFormComponentProps) => {
	if (props.error?.type === 'required') {
		return (
			<span className="p-error text-xs mb-3">
				{'Campo Obrigatório Não Preenchido.'}
			</span>
		);
	}
	if (props.error?.type === 'pattern') {
		return (
			<span className="p-error text-xs mb-3">{`${props.error?.message}`}</span>
		);
	}

	return <></>;
};
