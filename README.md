# electron-redux

[![package version](https://mckay.la/vbadge/@goosewobbler%2Felectron-redux/afbdf7)](https://npmjs.com/package/@goosewobbler/electron-redux)
[![build status](https://github.com/goosewobbler/electron-redux/workflows/main/badge.svg)](https://github.com/goosewobbler/electron-redux/actions)

![electron-redux data flow](https://cloud.githubusercontent.com/assets/307162/20675737/385ce59e-b585-11e6-947e-3867e77c783d.png)

Keeps your state in sync across all of your Electron processes by playing your
actions across all of them.

## Differences with [@mckayla/electron-redux](https://github.com/partheseas/electron-redux)

Updated dependencies, removed namespacing of actions, added preload typedefs and the E2E is more of a modern real-world case utilising React, React-Redux and Redux Toolkit.

## Usage

```javascript
// in the main process
import { syncMain } from '@goosewobbler/electron-redux';
const store = createStore(reducer, syncMain);
```

```javascript
// in the renderer processes
import { syncRenderer } from '@goosewobbler/electron-redux';
const store = createStore(reducer, syncRenderer);
```

```javascript
// in your preload script
import '@goosewobbler/electron-redux/preload';
```

If you don't have your own preload script, you can specify the provided preload
script directly whenever you initialize a `BrowserWindow`

```javascript
// when initializing a BrowserWindow
const view = new BrowserWindow({
  webPreferences: {
    preload: require.resolve('@goosewobbler/electron-redux/preload'),
  },
});
```

### w/ Webpack

If you use Webpack to bundle your renderer code, and you don't have `nodeIntegration`
enabled, you might also need to prevent the electron module from being included in
your renderer bundle. You can do this by including the following in your Webpack config.

```javascript
// in your webpack.config.js
module.exports = {
  resolve: {
    alias: {
      electron: false,
    },
  },
};
```

### w/ Parcel (or Webpack)

In your renderer code, you'll actually want to import the store enhancer from a submodule.

```javascript
// in your renderer processes
import { syncRenderer } from '@goosewobbler/electron-redux/renderer';
const store = createStore(reducer, syncRenderer);
```

## Actions

Actions **MUST** be [FSA](https://github.com/acdlite/flux-standard-action#example)-compliant,
i.e. have a `type` and `payload` property. Any actions not passing this test will
be ignored and simply passed through to the next middleware.

> NB: `redux-thunk` is not FSA-compliant out of the box, but can still produce compatible actions once the async action fires.

Actions **MUST** be serializable

- Objects with enumerable properties
- Arrays
- Numbers
- Booleans
- Strings
- Maps
- Sets

### Local actions

By default, all actions are played in all processes. If an action should only be
played in the current thread, then you can set the scope meta property to local.

```javascript
const myLocalActionCreator = () => ({
  type: 'MY_ACTION',
  payload: 123,
  meta: {
    scope: 'local', // only play the action locally
  },
});
```

We also provide a utility function for this

```javascript
import { stopForwarding } from '@goosewobbler/electron-redux';
dispatch(stopForwarding(action));
```

## Contributors

- [Mckayla Washburn](https://github.com/partheseas)
- [Burkhard Reffeling](https://github.com/hardchor)
- [Charlie Hess](https://github.com/CharlieHess)
- [Roman Paradeev](https://github.com/sameoldmadness)
