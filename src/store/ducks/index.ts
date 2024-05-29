import { configureStore } from '@reduxjs/toolkit';
import CrudComponentModeReducer from './CrudComponentMode';
import MenuComponentActive from './MenuComponentActive';

const store = configureStore({
	reducer: {
		CrudComponentModeReducer,
		MenuComponentActive,
	},
});

export default store;
