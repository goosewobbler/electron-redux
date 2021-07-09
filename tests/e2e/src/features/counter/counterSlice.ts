import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../common/types';

type Counter = number;

const initialState: Counter = 0;

export const slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      return state + 1;
    },
    decrement: (state) => {
      return state - 1;
    },
    adjustBy: (state, { payload: { amount } }: { payload: { amount: number } }) => {
      return state + amount;
    },
  },
});

export const { increment, decrement, adjustBy } = slice.actions;

export const selectCount = (state: AppState): number => state.count;

export const counterReducer = slice.reducer;
