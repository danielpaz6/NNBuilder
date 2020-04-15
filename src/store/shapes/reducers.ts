import {
	ShapeState,
	ADD_SHAPE,
	DELETE_SHAPE,
	EDIT_SHAPE_ACTIVATION,
	UPDATE_SHAPE_LOCATION,
	ShapeActionTypes,
	Shape
} from "./types";

const initialState: ShapeState = {
	shapes: []
};

export function shapeReducer(state = initialState, action: ShapeActionTypes) : ShapeState {
	const shapes = [...state.shapes];
	switch(action.type) {
		case ADD_SHAPE:
			return {
				...state,
				shapes: [...state.shapes, action.payload]
			};

		case DELETE_SHAPE:
			return {
				...state,
				shapes: state.shapes.filter(
					shape => shape.timestamp !== action.meta.timestamp
				)
			};

		case EDIT_SHAPE_ACTIVATION:
			// In the same loop we'll reset the active to false and active the selected one
			/*for(let i = 0; i < shapes.length; i++) {
				shapes[i].active = false;

				if(shapes[i].timestamp === action.meta.timestamp)
					shapes[i].active = action.meta.active;
			}
			
			return {
				shapes: shapes
			};*/
			
			return {
				...state,
				targetShape: state.shapes.find(s => s.timestamp === action.meta.timestamp)
			}
		
		case UPDATE_SHAPE_LOCATION:
			const currShape = shapes.find(s => s.timestamp === action.payload.timestamp)!;
			currShape.x = action.payload.x;
			currShape.y = action.payload.y;

			return {
				...state,
				shapes: shapes
			};
		
		default:
			return state;
	}
}