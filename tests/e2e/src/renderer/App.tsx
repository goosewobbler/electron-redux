import React, { ReactElement } from 'react';
import { Counter } from '../features/counter/Counter';
import { Items } from '../features/items/Items';

export const App = (): ReactElement => {
  return (
    <>
      <h1>electron-redux</h1>
      <Counter />
      <hr />
      <Items />
    </>
  );
};
