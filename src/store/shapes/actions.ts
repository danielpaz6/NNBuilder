import { Shape, ADD_SHAPE, DELETE_SHAPE, ShapeActionTypes } from './types';

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
