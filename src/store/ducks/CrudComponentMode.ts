import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type stateProps = {
	CrudComponentModeReducer: string;
};

export const TCrudComponentMode = {
	search: 'search',
	delete: 'delete',
	edit: 'edit',
	add: 'add',
	info: 'info',
};

const initialState = TCrudComponentMode.search;

const CrudComponentModeReducer = createSlice({
	name: 'CrudComponentModeReducer',
	initialState,
	reducers: {
		setCrudComponentMode: (_, { payload }: PayloadAction<string>) => {
			return payload;
		},
	},
});

export default CrudComponentModeReducer.reducer;
export const { setCrudComponentMode } = CrudComponentModeReducer.actions;
export const useCrudComponentMode = (state: stateProps) => {
	return state.CrudComponentModeReducer;
};
