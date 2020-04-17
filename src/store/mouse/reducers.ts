import { MouseState, MouseActionTypes, UPDATE_MOUSE_LOCATION } from "./types";

const initialState: MouseState = {
	xPointer: 0,
	yPointer: 0
};

export function mouseReducer(state = initialState, action: MouseActionTypes) : MouseState {
	switch(action.type) {
		case UPDATE_MOUSE_LOCATION:
			return {
				xPointer: action.payload.x,
				yPointer: action.payload.y
			}

		default:
			return state;
	}
}