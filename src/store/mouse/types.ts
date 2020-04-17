// Describing the mouse's slice of state
export interface MouseState {
	xPointer: number;
	yPointer: number;
}

// Describing the different ACTION NAMES available
export const UPDATE_MOUSE_LOCATION = "UPDATE_LOCATION";

interface UpdateMouseLocation {
	type: typeof UPDATE_MOUSE_LOCATION;
	payload: {
		x: number;
		y: number;
	};
}

export type MouseActionTypes =
	UpdateMouseLocation;