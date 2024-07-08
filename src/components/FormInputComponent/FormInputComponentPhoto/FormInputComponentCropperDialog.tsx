/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useEffect, useRef, useState } from 'react';
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

	const [cropData, setCropData] = useState<any>(null);
	const [cropperInstance, setCropperInstance] = useState<any>(null);

	const onCrop = () => {
		if (cropperRef.current) {
			setCropData(cropperRef.current.cropper.getData());
			props.onSave(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
			props.setIsVisisible(false);
		}
	};

	useEffect(() => {
		if (cropperInstance && cropData) {
			cropperInstance.setData(cropData);
		}
	}, [cropData, cropperInstance]);

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
				onInitialized={(instance) => {
					setCropperInstance(instance);
					if (cropData) {
						instance.setData(cropData);
					}
				}}
				responsive={true}
				autoCropArea={1}
				checkOrientation={false}
				src={props.value}
				style={{ height: 400, width: '100%' }}
			/>
		</Dialog>
	);
}
