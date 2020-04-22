import { LayerTypes } from "../../interfaces/shapes";
import { AllActivationFunctions } from "../../interfaces/activations";
import { ArrowMap } from "../../interfaces/arrowmap";

// Describing the shape of the shapes's slice of state
export interface Shape {
	name: string;
	timestamp: number;
	shape: LayerTypes;
	x: number;
	y: number;
	centerPosition: number[]; // X and Y locations relative to the top left edge of the shape
	//associatedArrows: Arrow[]; // include both connected to and connectedToMe
	//connectedTo: Shape[]; // pointers to the real shapes
	//connectedToMe: Shape[]; // pointers to the real shapes
	description?: string;
	//active: boolean;
}

export interface Arrow {
	source: Shape;
	target: Shape;
	activationFunction?: string;
}

export interface ShapeState {
	shapes: Shape[];
	sourceShape?: Shape;
	//arrows: Map<[Shape, Shape], AllActivationFunctions>;
	arrows: ArrowMap;
	//arrows: Arrow[];
	sourceArrow?: Arrow;
}

// Describing the different ACTION NAMES available
export const ADD_SHAPE = "ADD_SHAPE";
export const SET_SHAPES = "SET_SHAPES";
export const DELETE_SHAPE = "DELETE_SHAPE";
export const EDIT_SHAPE_ACTIVATION = "EDIT_SHAPE_ACTIVATION";
export const EDIT_SHAPE_NAME = "EDIT_SHAPE_NAME";
export const UPDATE_SHAPE_LOCATION = "UPDATE_SHAPE_LOCATION";
export const UPDATE_SHAPE_DESCRIPTION = "UPDATE_SHAPE_DESCRIPTION";

export const ADD_ARROW = "ADD_ARROW";
export const UPDATE_SHAPE_ARROWS = "UPDATE_SHAPE_ARROWS";

interface AddShapeAction {
	type: typeof ADD_SHAPE;
	payload: Shape;
}

interface SetShapesAction {
	type: typeof SET_SHAPES;
	payload: Shape[];
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
	};
}

interface EditShapeNameAction {
	type: typeof EDIT_SHAPE_NAME;
	payload: {
		timestamp: number;
		newName: string;
	};
}

interface UpdateShapeDescriptionAction {
	type: typeof UPDATE_SHAPE_DESCRIPTION;
	payload: {
		timestamp: number;
		desc: string;
	}
}

interface UpdateShapePositionAction {
	type: typeof UPDATE_SHAPE_LOCATION;
	payload: {
		timestamp: number,
		x: number,
		y: number
	};
}

interface AddArrowAction {
	type: typeof ADD_ARROW;
	payload: {
		source: Shape;
		target: Shape;
	}
}

interface UpdateShapeArrows {
	type: typeof UPDATE_SHAPE_ARROWS;
	meta: {
		timestamp: number;
	}
}

export type ShapeActionTypes =
	AddShapeAction |
	DeleteShapeAction |
	EditShapeActivationAction |
	UpdateShapePositionAction |
	AddArrowAction |
	UpdateShapeArrows |
	SetShapesAction |
	EditShapeNameAction |
	UpdateShapeDescriptionAction;