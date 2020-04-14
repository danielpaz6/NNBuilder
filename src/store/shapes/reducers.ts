import {
	ShapeState,
	ADD_SHAPE,
	DELETE_SHAPE,
	ShapeActionTypes
} from "./types";

const initialState: ShapeState = {
	shapes: []
};

export function shapeReducer(state = initialState, action: ShapeActionTypes) : ShapeState {
	switch(action.type) {
		case ADD_SHAPE:
			return {
				shapes: [...state.shapes, action.payload]
			};

		case DELETE_SHAPE:
			return {
				shapes: state.shapes.filter(
					shape => shape.timestamp !== action.meta.timestamp
				)
			};

		default:
			return state;
	}
}