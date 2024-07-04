/* eslint-disable react-hooks/rules-of-hooks */
import 'primeflex/primeflex.scss';
import 'primeflex/themes/primeone-dark.css';
import 'primeflex/themes/primeone-light.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { LoadingComponent } from './components/LoadingComponent.tsx';
import { Interceptors } from './config/interceptor/Interceptor.tsx';
import { queryClient } from './config/queryClient.ts';
import './index.scss';
import { router } from './routers/index.tsx';
import store from './store/ducks/index.ts';
import { useLocalePT } from './utils/useLocalePT.ts';

useLocalePT();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<Suspense fallback={<LoadingComponent />}>
				<Interceptors>
					{/* <GlobalLoalding /> */}
					<RouterProvider router={router} />
					{/* <CustomDialog /> */}
				</Interceptors>
			</Suspense>
		</Provider>
	</QueryClientProvider>
);
