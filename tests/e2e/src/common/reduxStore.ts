import { configureStore, StoreEnhancer, Store } from '@reduxjs/toolkit';
import { rootReducer } from '../features/rootReducer';

type AnyObject = Record<string, unknown>;

export function createReduxStore(syncFn: StoreEnhancer<AnyObject, AnyObject>): Store {
  const enhancers = [syncFn];

  const store = configureStore({
    reducer: rootReducer,
    enhancers,
  });

  return store;
}

export type { Store };
