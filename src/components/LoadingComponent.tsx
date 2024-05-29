import { ProgressSpinner } from 'primereact/progressspinner';

export const LoadingComponent = () => {
	return (
		<div
			className={`h-screen w-screen absolute bottom-0 left-0 top-0 right-0 flex justify-content-center align-items-center`}
			style={{ zIndex: 99999, backgroundColor: '#A0A3FF' }}
		>
			<ProgressSpinner
				style={{ width: '70px', height: '70px' }}
				strokeWidth="4"
			/>
		</div>
	);
};
