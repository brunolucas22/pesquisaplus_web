import { ChangeEvent } from 'react';
import './style.scss';

type ButtonFileProps = {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	label?: string;
	className?: string;
};

export const ButtonFile = ({ ...props }: ButtonFileProps) => {
	return (
		<div className={`custom-file-upload ${props.className}`}>
			<label htmlFor="file-upload" className="file-upload-button p-button">
				{props.label ?? 'Escolher arquivo'}
			</label>
			<input
				id="file-upload"
				className="file-upload-input"
				type="file"
				accept="image/*"
				onChange={(e) => {
					props.onChange(e);

					e.target.value = '';
				}}
			/>
		</div>
	);
};
