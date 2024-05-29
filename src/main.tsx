import 'primeflex/primeflex.scss';
import 'primeflex/themes/primeone-dark.css';
import 'primeflex/themes/primeone-light.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

import { CustomDialog } from '@components/DialogComponent/hooks/index.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { LoadingComponent } from './components/LoadingComponent.tsx';
import { queryClient } from './config/queryClient.ts';
import './index.scss';
import { router } from './routers/index.tsx';
import store from './store/ducks/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<Suspense fallback={<LoadingComponent />}>
				<RouterProvider router={router} />
				<CustomDialog />
			</Suspense>
		</Provider>
	</QueryClientProvider>
);