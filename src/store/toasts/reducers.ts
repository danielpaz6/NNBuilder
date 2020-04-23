import { ToastsState, ToastsActionTypes, ADD_TOAST, REMOVE_TOAST } from "./types";

const initialState: ToastsState = {
	notifications: []
};

export function toastsReducer(state = initialState, action: ToastsActionTypes) : ToastsState {
	switch(action.type) {
		case ADD_TOAST:
			return {
				...state,
				notifications: [...state.notifications, {
					timestamp: new Date().getTime(),
					title: action.payload.title,
					desc: action.payload.desc
				}]
			}

		case REMOVE_TOAST:
			return {
				...state,
				notifications: state.notifications.filter(n => n.timestamp !== action.meta.timestamp)
			}

		default:
			return state;
	}
}