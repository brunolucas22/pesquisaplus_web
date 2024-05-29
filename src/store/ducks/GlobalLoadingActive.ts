import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type stateProps = {
	GlobalLoadingActive: boolean;
};

const GlobalLoadingActive = createSlice({
	name: 'GlobalLoadingActive',
	initialState: false,
	reducers: {
		setGlobalLoadingActive: (_, { payload }: PayloadAction<boolean>) => {
			return payload;
		},
	},
});

export default GlobalLoadingActive.reducer;
export const { setGlobalLoadingActive } = GlobalLoadingActive.actions;
export const useGlobalLoadingActive = (state: stateProps) => {
	return state.GlobalLoadingActive;
};
