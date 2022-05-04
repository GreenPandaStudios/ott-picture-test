import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../src/store'


interface RedirecterState {
    page: string
}


// This is the initial page that should be loaded
const initialState : RedirecterState = {
  page: '/'
};

export const redirectSlice = createSlice({
  name: 'redirector',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<string>) => {
      state.page = action.payload;
    }
  }
});

export const { setPage } = redirectSlice.actions;
export const selectPage = (state: RootState) => state.redirector.page;
export default redirectSlice.reducer;