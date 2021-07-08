import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, selectCount } from './counterSlice';

export function Counter(): ReactElement {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <h2 id="count-display">{count}</h2>
      <button id="count-decrement" type="button" onClick={() => dispatch(decrement())}>
        -
      </button>
      <button id="count-increment" type="button" onClick={() => dispatch(increment())}>
        +
      </button>
    </div>
  );
}
