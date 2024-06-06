/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import { DialogComponent, DialogComponentProps } from '../DialogComponent';

let getDialogRef: any;
export const CustomDialog = () => {
	const dialogRef = useRef<any>();
	useEffect(() => {
		getDialogRef = dialogRef;
	}, []);
	return <DialogComponent ref={dialogRef}></DialogComponent>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const showErrorDialog = (configDialog: DialogComponentProps) => {
	if (!getDialogRef.current) return;
	const defaultConfigOption: DialogComponentProps = {
		...configDialog,
		icon: 'pi pi-exclamation-triangle',
		severity: 'error',
	};
	getDialogRef?.current.show(defaultConfigOption);
};

// eslint-disable-next-line react-refresh/only-export-components
export const showSuccessDialog = (configDialog: DialogComponentProps) => {
	if (!getDialogRef.current) return;
	const defaultConfigOption: DialogComponentProps = {
		...configDialog,
		icon: 'pi pi-check-square',
		severity: 'success',
	};
	getDialogRef.current.show(defaultConfigOption);
};
