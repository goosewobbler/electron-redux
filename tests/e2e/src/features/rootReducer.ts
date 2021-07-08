import { combineReducers } from '@reduxjs/toolkit';
import { counterReducer } from './counter/counterSlice';
import { itemsReducer } from './items/itemsSlice';

export type AppState = {
  count: number;
  items: Set<string>;
};

export const rootReducer = combineReducers({
  count: counterReducer,
  items: itemsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
