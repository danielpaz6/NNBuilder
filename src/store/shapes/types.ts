import { LayerTypes } from "../../interfaces/shapes";

// Describing the shape of the chat's slice of state
export interface Shape {
	name: string;
	timestamp: number;
	shape: LayerTypes;
	x: number;
	y: number;
	offset: {
		x: number;
		y: number;
	}
	connectedTo: Shape[];
}

export interface ShapeState {
	shapes: Shape[];
}

// Describing the different ACTION NAMES available
export const ADD_SHAPE = "ADD_SHAPE";
export const DELETE_SHAPE = "DELETE_SHAPE";

interface AddShapeAction {
	type: typeof ADD_SHAPE;
	payload: Shape;
}

interface DeleteShapeAction {
	type: typeof DELETE_SHAPE;
	meta: {
		timestamp: number;
	};
}

export type ShapeActionTypes = AddShapeAction | DeleteShapeAction;