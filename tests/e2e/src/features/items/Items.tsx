import React, { ReactElement, useState, BaseSyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems, addItem, removeItem } from './itemsSlice';

export function Items(): ReactElement {
  const [itemsInputValue, setItemsInputValue] = useState('');
  const items: string[] = useSelector(selectItems);
  const dispatch = useDispatch();

  const handleChange = (event: BaseSyntheticEvent): void => {
    setItemsInputValue((event.target as HTMLInputElement).value);
  };

  return (
    <div>
      <p id="set-display">
        {Array.from(items).map((item) => (
          <code key={item}>{item}</code>
        ))}
      </p>
      <input type="text" id="items-input" onChange={(event) => handleChange(event)} value={itemsInputValue} />
      <button id="add-item" type="button" onClick={() => dispatch(addItem({ item: itemsInputValue }))}>
        +
      </button>
      <button id="remove-item" type="button" onClick={() => dispatch(removeItem({ item: itemsInputValue }))}>
        -
      </button>
    </div>
  );
}
