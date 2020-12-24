import { contextBridge } from "electron";
import { getMainState, subscribeToActions, sendAction } from "./bindings";

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
