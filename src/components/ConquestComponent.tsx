import { IUsuarioConquista } from '@src/pages/ConquistasPage/interfaces';
import { IConquista } from '@src/pages/CrudConquistaPage/interfaces';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';

import { Divider } from 'primereact/divider';
import { Knob } from 'primereact/knob';

export type ConquestComponentProps = {
	maximized?: boolean;
	conquest: IConquista;
	userConquest?: IUsuarioConquista;
	customSelection?: (conquest: IConquista) => void;
};

export const ConquestComponent = ({ ...props }: ConquestComponentProps) => {
	const MaximizedComponent = () => {
		return (
			<div className="flex md:flex-row flex-column overflow-auto md:justify-content-start align-items-center  w-full h-full">
				<div
					className="h-full flex flex-column w-12rem max-w-12rem align-items-center justify-content-evenly"
					style={{
						minWidth: '12rem',
					}}
				>
					<img
						src={`${props.conquest.fotoConquista}`}
						alt={props.conquest.nomeConquista}
						className="w-6 shadow-2 "
					/>
					<Knob
						className="my-4"
						value={props.userConquest?.progressoUsuarioConquista ?? 0}
						valueTemplate={'{value}%'}
					/>
					<Rating
						value={props.userConquest?.nivelUsuarioConquista || 0}
						readOnly
						cancel={false}
					/>
				</div>
				<div className="h-full max-w-full flex flex-column align-items-start justify-content-start">
					<h4 className="mb-1 text-overflow-ellipsis font-bold">
						{props.conquest.nomeConquista}
					</h4>
					{props.userConquest ? (
						<>
							<h6 className="m-0 mb-2 text-overflow-ellipsis">
								Data da sua primeira estrela:{' '}
								{props.userConquest.dataUsuarioConquista}
							</h6>
							<h6 className="m-0 mb-2 text-overflow-ellipsis">
								Data da sua última estrela:{' '}
								{props.userConquest.dataNivelAtualUsuarioConquista}
							</h6>
						</>
					) : (
						<>
							<br />
							<h6 className="m-0 mb-2 text-overflow-ellipsis text-left">
								Você ainda não possui essa conquista, leia a descrição e tente
								desbloquea-la!
							</h6>
						</>
					)}
					<Divider className="w-20rem" />
					<div className=" text-overflow-ellipsis h-20rem">
						<h6 className="m-0 h-full text-overflow-ellipsis text-left font-bold">
							{props.conquest.descricaoConquista}
						</h6>
					</div>
				</div>
				<div className="mb-3 "></div>{' '}
			</div>
		);
	};

	const MinimizedComponent = () => {
		return (
			<>
				<div className="mb-3 ">
					<img
						src={`${props.conquest.fotoConquista}`}
						alt={props.conquest.nomeConquista}
						className="w-6 shadow-2 "
					/>
				</div>
				<Rating
					value={props.userConquest?.nivelUsuarioConquista || 0}
					readOnly
					cancel={false}
				/>
				<div className="overflow-hidden text-overflow-ellipsis h-20rem">
					<h4 className="mb-1 text-overflow-ellipsis">
						{props.conquest.nomeConquista}
					</h4>
					<h6 className="m-0 h-full text-overflow-ellipsis">
						{props.conquest.descricaoConquista}
					</h6>
				</div>
				<Button
					label="Inspecionar Conquista"
					onClick={() => {
						props.customSelection && props.customSelection(props.conquest);
					}}
				/>
			</>
		);
	};

	return (
		<div
			className={`max-w-full flex flex-column border-1 surface-border border-round m-2 text-center py-5 px-3 bg-white align-items-center justify-content-center ${
				props.maximized ? 'h-26rem' : 'h-22rem'
			}`}
		>
			{props.maximized ? <MaximizedComponent /> : <MinimizedComponent />}
		</div>
	);
};
