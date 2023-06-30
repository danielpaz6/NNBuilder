import { 
	ADD_SHAPE,
	SET_SHAPES,
	DELETE_SHAPE,
	EDIT_SHAPE_ACTIVATION,
	UPDATE_SHAPE_LOCATION,
	ShapeActionTypes,
	ADD_ARROW,
	UPDATE_SHAPE_ARROWS,
	EDIT_SHAPE_NAME,
	UPDATE_SHAPE_DESCRIPTION,
	SET_SHAPE_ADDITONAL_INFO,
	EDIT_ARROW_ACTIVATION,
	EDIT_ACTIVATION_FUNCTION,
	DELETE_ARROW,
	UPDATE_SHAPE_CENTER_POSITION
} from './types';
import { Shape, AdditionalInformationType } from '../../interfaces/IShape';
import { AllActivationFunctions } from '../../interfaces/activations';
import ArrowMap from '../../interfaces/arrowmap';

export function addShape(newShape: Shape) : ShapeActionTypes {
	return {
		type: ADD_SHAPE,
		payload: newShape
	};
}

export function setShapes(shapes: Shape[], arrows?: ArrowMap) : ShapeActionTypes {
	return {
		type: SET_SHAPES,
		payload: {
			shapes: shapes,
			arrows: arrows
		}
	};
}

export function deleteShape() : ShapeActionTypes {
	return {
		type: DELETE_SHAPE
	};
}

export function deleteArrow() : ShapeActionTypes {
	return {
		type: DELETE_ARROW
	}
}

export function updateCenterPosition(template: string, position: number[]) : ShapeActionTypes {
	return {
		type: UPDATE_SHAPE_CENTER_POSITION,
		payload: {
			newPosition: position,
			template: template
		}
	}
}

export function editActiveShape(timestamp: number) : ShapeActionTypes {
	return {
		type: EDIT_SHAPE_ACTIVATION,
		meta: {
			timestamp: timestamp
		}
	};
}

export function editActivationFunction(func: AllActivationFunctions) : ShapeActionTypes {
	return {
		type: EDIT_ACTIVATION_FUNCTION,
		payload: {
			func: func
		}
	}
}

export function editActiveArrow(source: Shape, target: Shape) : ShapeActionTypes {
	return {
		type: EDIT_ARROW_ACTIVATION,
		meta: {
			sourceShape: source,
			targetShape: target
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

export function setShapeAdditionalInfo(timestamp: number, key: string, value: AdditionalInformationType) : ShapeActionTypes {
	return {
		type: SET_SHAPE_ADDITONAL_INFO,
		payload: {
			timestamp: timestamp,
			key: key,
			value: value
		}
	}
}