import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type stateProps = {
	MenuComponentActive: boolean;
};

const MenuComponentActive = createSlice({
	name: 'MenuComponentActive',
	initialState: false,
	reducers: {
		setMenuComponentActive: (_, { payload }: PayloadAction<boolean>) => {
			return payload;
		},
	},
});

export default MenuComponentActive.reducer;
export const { setMenuComponentActive } = MenuComponentActive.actions;
export const useMenuComponentActive = (state: stateProps) => {
	return state.MenuComponentActive;
};
