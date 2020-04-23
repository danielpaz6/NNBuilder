import { ToastsActionTypes, ADD_TOAST, REMOVE_TOAST } from "./types";

export function addToast(title: string, desc: string) : ToastsActionTypes {
	return {
		type: ADD_TOAST,
		payload: {
			title: title,
			desc: desc
		}
	};
}

export function removeToast(timestamp: number) : ToastsActionTypes {
	return {
		type: REMOVE_TOAST,
		meta: {
			timestamp: timestamp
		}
	};
}