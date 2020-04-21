import { 
	Shape,
	ADD_SHAPE,
	SET_SHAPES,
	DELETE_SHAPE,
	EDIT_SHAPE_ACTIVATION,
	UPDATE_SHAPE_LOCATION,
	ShapeActionTypes,
	ADD_ARROW,
	UPDATE_SHAPE_ARROWS,
	EDIT_SHAPE_NAME,
	UPDATE_SHAPE_DESCRIPTION
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
	};
}

export function editShapeName(timestamp: number, name: string) : ShapeActionTypes {
	return {
		type: EDIT_SHAPE_NAME,
		payload: {
			timestamp: timestamp,
			newName: name
		}
	};
}

export function updateShapePositionAction(timestamp: number, x: number, y: number) : ShapeActionTypes {
	return {
		type: UPDATE_SHAPE_LOCATION,
		payload: {
			timestamp: timestamp,
			x: x,
			y: y
		}
	};
}

export function updateShapeDescription(timestamp: number, desc: string) : ShapeActionTypes {
	return {
		type: UPDATE_SHAPE_DESCRIPTION,
		payload: {
			timestamp: timestamp,
			desc: desc
		}
	};
}

export function addArrowAndUpdateConnections(source: Shape, target: Shape) : ShapeActionTypes {
	return {
		type: ADD_ARROW,
		payload: {
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
	};
}