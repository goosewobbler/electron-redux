import { ipcRenderer } from "electron";
import { Action, MiddlewareAPI } from "redux";

import { hydrate, stopForwarding } from "../helpers";

export async function getMainState() {
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

export function subscribeToActions(store: MiddlewareAPI) {
	ipcRenderer.on("mckayla.electron-redux.ACTION", (_, action) => {
		store.dispatch(stopForwarding(action));
	});
}

export function sendAction(action: Action) {
	ipcRenderer.send("mckayla.electron-redux.ACTION", action);
}
