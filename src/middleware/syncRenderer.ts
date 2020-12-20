import { ipcRenderer } from "electron";
import {
	Action,
	AnyAction,
	applyMiddleware,
	Middleware,
	Reducer,
	StoreCreator,
	StoreEnhancer,
} from "redux";

import {
	hydrate,
	preventDoubleInitialization,
	stopForwarding,
	validateAction,
} from "../helpers";

async function getMainState() {
	// Electron will throw an error if there isn't a handler for the channel.
	// We catch it so that we can throw a more useful error
	const state = await ipcRenderer
		.invoke("mckayla.electron-redux.FETCH_STATE")
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.error(error);
			throw new Error(
				"No Redux store found in main process. Did you use the syncMain enhancer?",
			);
		});

	// We do some fancy hydration on certain types like Map and Set.
	// See also `freeze`
	const hydratedState = JSON.parse(state, hydrate);
	return hydratedState;
}

/**
 * This next bit is all just for being able to fill the store with the correct
 * state asynchronously, because blocking the thread feels bad for potentially
 * large stores.
 */
// TODO: This erases generics and replaces them with unknown, which is kind of bad
type InternalAction = ReturnType<typeof replaceState>;

/**
 * Creates an action that will replace the current state with the provided
 * state. The scope is set to local in this creator function to make sure it is
 * never forwarded.
 */
const replaceState = <S>(state: S) => ({
	type: "mckayla.electron-redux.REPLACE_STATE" as const,
	payload: state,
	meta: { scope: "local" },
});

const wrapReducer = <S = any, A extends Action<any> = AnyAction>(
	reducer: Reducer<S, A>,
): Reducer<S, InternalAction | A> => (state, action) => {
	switch (action.type) {
		case "mckayla.electron-redux.REPLACE_STATE":
			return (action as InternalAction).payload as S;
		default:
			return reducer(state, action as A);
	}
};

const middleware: Middleware = (store) => {
	// When receiving an action from main
	ipcRenderer.on("mckayla.electron-redux.ACTION", (_, action: Action) => {
		store.dispatch(stopForwarding(action));
	});

	return (next) => (action) => {
		if (validateAction(action)) {
			ipcRenderer.send("mckayla.electron-redux.ACTION", action);
		}

		return next(action);
	};
};

export const syncRenderer: StoreEnhancer = (createStore: StoreCreator) => {
	preventDoubleInitialization();

	return (reducer, state) => {
		const store = createStore(
			wrapReducer(reducer),
			state,
			applyMiddleware(middleware),
		);

		// This is the reason we need to be an enhancer, rather than a middleware.
		// We use this (along with the wrapReducer function above) to dispatch an
		// action that initializes the store without needing to fetch it synchronously.
		// I don't know why it yells about this "floating" when we clearly handle it
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		getMainState().then((mainState) => {
			store.dispatch(replaceState(mainState));
		});

		// XXX: TypeScript is dumb. If you return the call to createStore
		// immediately it's fine, but even assigning it to a constant and returning
		// will make it freak out. We fix this with the line below the return.
		return store;

		// XXX: Even though this is unreachable, it fixes the type signature????
		return (store as unknown) as any;
	};
};
