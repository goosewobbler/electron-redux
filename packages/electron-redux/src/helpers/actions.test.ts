import { stopForwarding, validateAction } from './actions';

test('stopForwarding should cause validateAction to return false', () => {
  const action = {
    type: 'electron-redux.DNF_TEST',
    payload: {},
  };

  expect(validateAction(action)).toBe(true);
  expect(validateAction(stopForwarding(action))).toBe(false);
});
