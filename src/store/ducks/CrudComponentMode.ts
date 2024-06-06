import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EnumCrudComponentMode } from '@src/utils/enums/enumCrudComponentMode';

type stateProps = {
	CrudComponentModeReducer: EnumCrudComponentMode;
};

const initialState = EnumCrudComponentMode.search;

const CrudComponentModeReducer = createSlice({
	name: 'CrudComponentModeReducer',
	initialState,
	reducers: {
		setCrudComponentMode: (
			_,
			{ payload }: PayloadAction<EnumCrudComponentMode>
		) => {
			return payload;
		},
	},
});

export default CrudComponentModeReducer.reducer;
export const { setCrudComponentMode } = CrudComponentModeReducer.actions;
export const useCrudComponentMode = (state: stateProps) => {
	return state.CrudComponentModeReducer;
};
