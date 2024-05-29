import { Outlet } from 'react-router-dom';
import './App.scss';
import { MenuLayout } from './layout/Menu';

const App = () => {
	return (
		<div className="App">
			<header className="App-header">
				<MenuLayout />
				<div
					id="detail"
					className="overflow-auto"
					style={{ maxHeight: '100% !important', maxWidth: '100% !important' }}
				>
					<Outlet />
				</div>
			</header>
		</div>
	);
};

export default App;
