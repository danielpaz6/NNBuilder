import { 
	Shape,
	ADD_SHAPE,
	SET_SHAPES,
	DELETE_SHAPE,
	EDIT_SHAPE_ACTIVATION,
	UPDATE_SHAPE_LOCATION,
	ShapeActionTypes,
	ADD_ARROW,
	UPDATE_SHAPE_ARROWS
} from './types';

export function addShape(newShape: Shape) : ShapeActionTypes {
	return {
		type: ADD_SHAPE,
		payload: newShape
	};
}

export function setShapes(shapes: Shape[]) : ShapeActionTypes {
	return {
		type: SET_SHAPES,
		payload: shapes
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

export function addArrowAndUpdateConnections(timestamp: number, source: Shape, target: Shape) : ShapeActionTypes {
	return {
		type: ADD_ARROW,
		payload: {
			timestamp: timestamp,
			source: source,
			target: target
		}
	}
}

export function updateShapeArrows(timestamp: number) : ShapeActionTypes {
	return {
		type: UPDATE_SHAPE_ARROWS,
		meta: {
			timestamp: timestamp
		}
	}
}