import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../rootReducer';

type Counter = {
  count: number;
};

const initialState: Counter = {
  count: 0,
};

exports.addItem = (item: string) => ({
  type: 'e2e/addItem',
  payload: { item },
});

export const slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count = state.count + 1;
    },
    decrement: (state) => {
      state.count = state.count - 1;
    },
    adjustBy: (state, { payload: { amount } }) => {
      state.count = state.count + amount;
    },
  },
});

export const { increment, decrement, adjustBy } = slice.actions;

export const selectCount = (state: AppState): Counter['count'] => state.count;

export const counterReducer = slice.reducer;
