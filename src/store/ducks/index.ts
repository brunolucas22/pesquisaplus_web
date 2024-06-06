import { configureStore } from '@reduxjs/toolkit';
import CrudComponentModeReducer from './CrudComponentMode';
import GlobalLoadingActive from './GlobalLoadingActive';
import MenuComponentActive from './MenuComponentActive';

const store = configureStore({
	reducer: {
		CrudComponentModeReducer,
		MenuComponentActive,
		GlobalLoadingActive,
	},
});

export default store;
