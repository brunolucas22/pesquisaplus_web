import { Carousel } from 'primereact/carousel';

import { useState } from 'react';
import { ConquestComponent } from '../../components/ConquestComponent';
import { IConquista } from '../CrudConquistaPage/interfaces';
import { mockCon, mockUsCon } from './mock';
// import { ProductService } from './service/ProductService';
const ConquistasPage = () => {
	const [conquistaSelecionada, setConquistaSelecionada] = useState<
		IConquista | undefined
	>();
	const responsiveOptions = [
		{
			breakpoint: '1400px',
			numVisible: 2,
			numScroll: mockCon.length / 2,
		},

		{
			breakpoint: '767px',
			numVisible: 1,
			numScroll: mockCon.length / mockCon.length,
		},
	];
	return (
		<div className="flex flex-column max-w-full max-h-full">
			<Carousel
				className="mt-5 p-0 max-w-full "
				value={mockCon}
				numVisible={4}
				circular
				autoplayInterval={3000}
				numScroll={mockCon.length / 4}
				responsiveOptions={responsiveOptions}
				itemTemplate={(item: IConquista) => (
					<ConquestComponent
						customSelection={(conquest) => {
							setConquistaSelecionada(conquest);
						}}
						conquest={item}
						userConquest={mockUsCon.find(
							(element) => element.conquistaUsuarioConquista === item.id
						)}
					/>
				)}
			/>

			{conquistaSelecionada && (
				<ConquestComponent
					maximized
					customSelection={(conquest) => {
						setConquistaSelecionada(conquest);
					}}
					conquest={conquistaSelecionada}
					userConquest={mockUsCon.find(
						(element) =>
							element.conquistaUsuarioConquista === conquistaSelecionada.id
					)}
				/>
			)}
		</div>
	);
};

export default ConquistasPage;
