import DOMPurify from 'dompurify';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { forwardRef, useImperativeHandle, useState } from 'react';

export interface DialogComponentProps {
	message?: string;
	buttonLabel?: string;
	func: () => void;
	icon?: string;
	severity?: string;
}

export const DialogComponent = forwardRef((_, ref) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [configDialog, setConfigDialog] = useState<DialogComponentProps>();

	useImperativeHandle(ref, () => ({
		show: (confDialog: DialogComponentProps) => {
			setConfigDialog(confDialog);
			setIsVisible(true);
		},
		hide: () => {
			setIsVisible(false);
		},
	}));
	const getButtonColor = () => {
		switch (configDialog?.severity) {
			case 'error':
				return 'p-button-danger';
			case 'success':
				return 'p-button';
		}
	};
	const getIconColor = () => {
		switch (configDialog?.severity) {
			case 'error':
				return 'p-error';
			case 'success':
				return 'text-primary';
		}
	};
	const useSanitize = (): string => {
		if (!configDialog || !configDialog.message) return '';
		return DOMPurify.sanitize(configDialog?.message);
	};
	return (
		<div>
			<Dialog
				style={{ width: '450px', borderTop: '6px solid #B00020' }}
				headerStyle={{
					borderTopLeftRadius: '0px',
					borderTopRightRadius: '0px',
				}}
				closable={false}
				draggable={false}
				visible={isVisible}
				breakpoints={{ '960px': '75vw', '641px': '90vw' }}
				position="center"
				onHide={() => {
					setIsVisible(false);
				}}
			>
				<div
					className="flex flex-column align-items-center"
					style={{ flex: '1' }}
				>
					<div className="text-center">
						<i
							className={`${configDialog?.icon} ${getIconColor()} mb-2`}
							style={{ fontSize: '3rem' }}
						></i>
						<div
							className="text-justify"
							dangerouslySetInnerHTML={{ __html: useSanitize() }}
						/>
					</div>
					<div className="mt-2 flex gap-2">
						<Button
							onClick={() => {
								configDialog?.func();
								setIsVisible(false);
							}}
							type="button"
							label={configDialog?.buttonLabel || 'OK'}
							className={`${getButtonColor()} w-full`}
						/>
					</div>
				</div>
			</Dialog>
		</div>
	);
});
