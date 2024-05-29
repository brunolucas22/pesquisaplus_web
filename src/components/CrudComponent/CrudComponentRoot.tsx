import { useCrudComponentMode } from '@src/store/ducks/CrudComponentMode';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const CrudComponentRoot = () => {
	const crudComponentMode = useSelector(useCrudComponentMode);
	useEffect(() => {
		console.log(crudComponentMode);
	}, [crudComponentMode]);
	return <>{crudComponentMode}</>;
};
