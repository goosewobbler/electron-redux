# electron-redux

[![build status](https://github.com/partheseas/electron-redux/workflows/main/badge.svg)](https://github.com/partheseas/electron-redux/actions)
[![package version](https://mckay.la/vbadge/@mckayla%2Felectron-redux/afbdf7)](https://npmjs.com/package/@mckayla/electron-redux)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io)

![electron-redux data flow](https://cloud.githubusercontent.com/assets/307162/20675737/385ce59e-b585-11e6-947e-3867e77c783d.png)

Keeps your state in sync across all of your Electron processes by playing your
actions across all of them.

## Usage

### with nodeIntegration enabled

```javascript
// in the main process
import { syncMain } from "@mckayla/electron-redux";
const store = createStore(reducer, syncMain);
```

```javascript
// in the renderer processes
import { syncRenderer } from "@mckayla/electron-redux";
const store = createStore(reducer, syncRenderer);
```

### with contextIsolation enabled

To use this package with contextIsolation enabled, you'll need to use the
store enhancers as shown above, some sort of bundler (such as Webpack),
and _one_ of the options presented below. Probably the second one, as you'll
likely want to run some code of your own during the preload execution.

```javascript
// when initializing a BrowserWindow
const view = new BrowserWindow({
	webPreferences: {
		contextIsolation: true,
		preload: require.resolve("@mckayla/electron-redux/preload"),
	},
});
```

or

```javascript
// in your own preload script
import "@mckayla/electron-redux/preload";
```

If you use Webpack, you'll also need to prevent electron from being linked to
your renderer bundle. You can do this by aliasing electron to the polyfill that
we provide.

````javascript
// in your webpack.config.js
module.exports = {
	resolve: {
		alias: {
			electron: require.resolve("@mckayla/electron-redux/electron"),
		},
	},
};

## Actions

Actions **MUST** be [FSA](https://github.com/acdlite/flux-standard-action#example)-compliant,
i.e. have a `type` and `payload` property. Any actions not passing this test will
be ignored and simply passed through to the next middleware.

> NB: `redux-thunk` is not FSA-compliant out of the box, but can still produce compatible actions once the async action fires.

Actions **MUST** be serializable

-   Objects with enumerable properties
-   Arrays
-   Numbers
-   Booleans
-   Strings
-   Maps
-   Sets

### Local actions

By default, all actions are played in all processes. If an action should only be
played in the current thread, then you can set the scope meta property to local.

```javascript
const myLocalActionCreator = () => ({
	type: "MY_ACTION",
	payload: 123,
	meta: {
		scope: "local", // only play the action locally
	},
});
````

We also provide a utility function for this

```
import { stopForwarding } from "@mckayla/electron-redux";
dispatch(stopForwarding(action));
```

## Contributors

-   [Burkhard Reffeling](https://github.com/hardchor)
-   [Charlie Hess](https://github.com/CharlieHess)
-   [Roman Paradeev](https://github.com/sameoldmadness)
