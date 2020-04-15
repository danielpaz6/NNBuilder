import { 
	Shape,
	ADD_SHAPE,
	DELETE_SHAPE,
	EDIT_SHAPE_ACTIVATION,
	UPDATE_SHAPE_LOCATION,
	ShapeActionTypes
} from './types';

export function addShape(newShape: Shape) : ShapeActionTypes {
	return {
		type: ADD_SHAPE,
		payload: newShape
	};
}

export function deleteShape(timestamp: number) : ShapeActionTypes {
	return {
		type: DELETE_SHAPE,
		meta: {
			timestamp
		}
	};
}

export function editActiveShape(timestamp: number) : ShapeActionTypes {
	return {
		type: EDIT_SHAPE_ACTIVATION,
		meta: {
			timestamp: timestamp
		}
	}
}

export function updateShapePositionAction(timestamp: number, x: number, y: number) : ShapeActionTypes {
	return {
		type: UPDATE_SHAPE_LOCATION,
		payload: {
			timestamp: timestamp,
			x: x,
			y: y
		}
	}
}