import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../common/types';

const initialState: string[] = ['a', 'b', 'c'];

export const slice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, { payload: { item } }: { payload: { item: string } }) => {
      return [...state, item];
    },
    removeItem: (state, { payload: { item } }) => {
      return state.filter((stateItem) => stateItem !== item);
    },
  },
});

export const { addItem, removeItem } = slice.actions;

export const selectItems = (state: AppState): string[] => state.items;

export const itemsReducer = slice.reducer;
