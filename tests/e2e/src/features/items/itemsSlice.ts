import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../common/types';

export type Items = string[];

const initialState: Items = ['a', 'b', 'c'];

export const slice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, { payload: { item } }) => {
      return [...state, item];
    },
    removeItem: (state, { payload: { item } }) => {
      return state.filter((stateItem) => stateItem !== item);
    },
  },
});

export const { addItem, removeItem } = slice.actions;

export const selectItems = (state: AppState) => state.items;

export const itemsReducer = slice.reducer;
