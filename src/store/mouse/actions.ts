import { MouseActionTypes, UPDATE_MOUSE_LOCATION } from "./types";

export function updateMouseLocation(x: number, y: number) : MouseActionTypes {
	return {
		type: UPDATE_MOUSE_LOCATION,
		payload: {
			x,
			y
		}
	};
}