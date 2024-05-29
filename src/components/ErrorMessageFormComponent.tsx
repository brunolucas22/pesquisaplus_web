/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type ErrorMessageFormComponentProps = {
	error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};

export const ErrorMessageFormComponent = ({
	...props
}: ErrorMessageFormComponentProps) => {
	return (
		props.error?.type === 'required' && (
			<span className="p-error text-xs mb-3">
				{'Campo Obrigatório Não Preenchido.'}
			</span>
		)
	);
};
