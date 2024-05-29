import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { useDispatch } from 'react-redux';
import { setMenuComponentActive } from '../../store/ducks/MenuComponentActive';
import { SearchModule } from './components/SearchModule';

export const AppTopBar = () => {
	const dispatch = useDispatch();
	const setVisible = (value: boolean) => {
		dispatch(setMenuComponentActive(value));
	};
	return (
		<Toolbar
			className="p-2"
			start={
				<Button
					icon={'pi pi-bars'}
					onClick={() => {
						setVisible(true);
					}}
				/>
			}
			center={SearchModule}
		/>
	);
};
