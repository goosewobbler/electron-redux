import { contextBridge, ipcRenderer } from "electron";
import { Action, MiddlewareAPI } from "redux";

import { hydrate, stopForwarding } from "../helpers";

declare global {
	interface Bridge {
		getMainState: typeof getMainState;
		subscribeToActions: typeof subscribeToActions;
		sendAction: typeof sendAction;
	}

	interface Window {
		__temp_mckayla: Bridge;
	}

	const __temp_mckayla: Bridge;
}

export const preload = () => {
	const bridge = {
		getMainState,
		subscribeToActions,
		sendAction,
	};

	// contextBridge will throw an error if contextIsolation is not enabled, so
	// we try to see if it works, and if not we mutate the window directly.
	try {
		contextBridge.exposeInMainWorld("__temp_mckayla", bridge);
	} catch {
		window.__temp_mckayla = bridge;
	}
};

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
