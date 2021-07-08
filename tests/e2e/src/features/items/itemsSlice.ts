import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../common/types';

type Items = {
  items: Set<string>;
};

const initialState: Items = {
  items: new Set(['a', 'b', 'c']),
};

export const slice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, { payload: { item } }) => {
      state.items.add(item);
    },
    removeItem: (state, { payload: { item } }) => {
      state.items.delete(item);
    },
  },
});

export const { addItem, removeItem } = slice.actions;

export const selectItems = (state: AppState): Items['items'] => state.items;

export const itemsReducer = slice.reducer;
