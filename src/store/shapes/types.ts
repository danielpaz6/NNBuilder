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
	active: boolean;
}

export interface ShapeState {
	shapes: Shape[];
}

// Describing the different ACTION NAMES available
export const ADD_SHAPE = "ADD_SHAPE";
export const DELETE_SHAPE = "DELETE_SHAPE";
export const EDIT_SHAPE_ACTIVATION = "EDIT_SHAPE_ACTIVATION";
export const UPDATE_SHAPE_LOCATION = "UPDATE_SHAPE_LOCATION";

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

interface EditShapeActivationAction {
	type: typeof EDIT_SHAPE_ACTIVATION;
	meta: {
		timestamp: number;
		active: boolean;
	};
}

interface UpdateShapePositionAction {
	type: typeof UPDATE_SHAPE_LOCATION;
	payload: {
		timestamp: number,
		x: number,
		y: number
	};
}

export type ShapeActionTypes =
	AddShapeAction |
	DeleteShapeAction |
	EditShapeActivationAction |
	UpdateShapePositionAction;