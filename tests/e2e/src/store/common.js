const init = () => ({
  count: 0,
  items: new Set(['a', 'b', 'c']),
});

// type Action =
// 	| ReturnType<typeof increment>
// 	| ReturnType<typeof decrement>
// 	| ReturnType<typeof adjustBy>;
//  | ReturnType<typeof addItem>;

exports.increment = () => ({
  type: 'e2e/increment',
});

exports.decrement = () => ({
  type: 'e2e/decrement',
});

exports.adjustBy = (amount) => ({
  type: 'e2e/adjustBy',
  payload: { amount },
});

exports.addItem = (item) => ({
  type: 'e2e/addItem',
  payload: { item },
});

exports.reducer = (state = init(), action) => {
  switch (action.type) {
    case 'e2e/increment':
      return { ...state, count: state.count + 1 };
    case 'e2e/decrement':
      return { ...state, count: state.count - 1 };
    case 'e2e/adjustBy':
      return { ...state, count: state.count + action.payload.amount };
    case 'e2e/addItem': {
      const copy = new Set(state.items);
      copy.add(action.payload.item);
      return { ...state, items: copy };
    }
    default:
      return state;
  }
};
