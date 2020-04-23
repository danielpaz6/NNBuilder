// Describing the mouse's slice of state
export interface ToastsState {
	notifications: ToastInformation[];
}

export interface ToastInformation {
	timestamp: number;
	title: string;
	desc: string;
}

// Describing the different ACTION NAMES available
export const ADD_TOAST = "ADD_TOAST";
export const REMOVE_TOAST = "REMOVE_TOAST";

interface AddToastAction {
	type: typeof ADD_TOAST;
	payload: {
		title: string;
		desc: string;
	};
}

interface RemoveToastAction {
	type: typeof REMOVE_TOAST;
	meta: {
		timestamp: number;
	}
}

export type ToastsActionTypes =
	AddToastAction |
	RemoveToastAction;