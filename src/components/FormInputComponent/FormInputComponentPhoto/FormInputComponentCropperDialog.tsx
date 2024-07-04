/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useRef } from 'react';
import Cropper from 'react-cropper';
import { FieldValues, Path, PathValue } from 'react-hook-form';
import './style.scss';

type FormInputComponentCropperDialog<Interface extends FieldValues> = {
	isVisible: boolean;
	setIsVisisible: React.Dispatch<React.SetStateAction<boolean>>;
	value: PathValue<Interface, Path<Interface>>;
	onSave: (value: string) => void;
};
export function FormInputComponentCropperDialog<Interface extends FieldValues>({
	...props
}: FormInputComponentCropperDialog<Interface>) {
	const cropperRef = useRef<any>(null);

	const onCrop = () => {
		if (cropperRef.current) {
			props.onSave(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
			props.setIsVisisible(false);
		}
	};

	return (
		<Dialog
			header={<>Recortar Imagem</>}
			className="cropper-dialog"
			visible={props.isVisible}
			onHide={() => {
				props.setIsVisisible(false);
			}}
			footer={
				<div className="flex flex-row">
					<Button
						label={'Salvar'}
						className="w-full"
						severity="success"
						type="button"
						onClick={() => {
							onCrop();
						}}
					/>
					<Button
						severity="danger"
						className="w-full"
						onClick={() => {
							props.setIsVisisible(false);
						}}
						type="button"
						label={'Cancelar'}
					/>
				</div>
			}
		>
			<Cropper
				initialAspectRatio={1}
				aspectRatio={1}
				guides={false}
				ref={cropperRef}
				viewMode={1}
				minCropBoxHeight={10}
				minCropBoxWidth={10}
				background={false}
				responsive={true}
				autoCropArea={1}
				checkOrientation={false}
				src={props.value}
				style={{ height: 400, width: '100%' }}
			/>
		</Dialog>
	);
}
