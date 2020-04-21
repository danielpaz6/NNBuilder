import {
	ShapeState,
	ADD_SHAPE,
	DELETE_SHAPE,
	EDIT_SHAPE_ACTIVATION,
	UPDATE_SHAPE_LOCATION,
	ShapeActionTypes,
	ADD_ARROW,
	SET_SHAPES,
	EDIT_SHAPE_NAME,
	UPDATE_SHAPE_DESCRIPTION,
	//Arrow,
	Shape,
	//UPDATE_SHAPE_ARROWS,
} from "./types";
import { AllActivationFunctions } from "../../interfaces/activations";

const initialState: ShapeState = {
	shapes: [],
	arrows: new Map<[Shape, Shape], AllActivationFunctions>()
};

export function shapeReducer(state = initialState, action: ShapeActionTypes) : ShapeState {
	const shapes = [...state.shapes];

	/*
	 * NOTE: a nice article that explain why we should use curly braces in our case block sections.
		 ( it is also supported by the official docs of redux )
		 
	 * https://medium.com/@e_himmelfarb/use-curly-braces-with-es6-let-and-const-in-switch-blocks-react-redux-reducers-c0b01b37d748
	 */

	switch(action.type) {
		case ADD_SHAPE:
			return {
				...state,
				shapes: [...state.shapes, action.payload]
			};

		case SET_SHAPES:
			return {
				...state,
				shapes: [...action.payload],
				sourceShape: undefined
			};

		case DELETE_SHAPE:
			return {
				...state,
				shapes: state.shapes.filter(
					shape => shape.timestamp !== action.meta.timestamp
				)
			};

		case EDIT_SHAPE_ACTIVATION:
			return {
				...state,
				sourceShape: state.shapes.find(s => s.timestamp === action.meta.timestamp)
			}

		case EDIT_SHAPE_NAME: {
			const currShape = shapes.find(s => s.timestamp === action.payload.timestamp)!;
			currShape.name = action.payload.newName;
			
			return {
				...state,
				shapes
			}
		}
		
		case UPDATE_SHAPE_LOCATION: {
			const currShape = shapes.find(s => s.timestamp === action.payload.timestamp)!;
			currShape.x = action.payload.x;
			currShape.y = action.payload.y;

			return {
				...state,
				shapes: shapes
			};
		}

		case UPDATE_SHAPE_DESCRIPTION: {
			const currShape = shapes.find(s => s.timestamp === action.payload.timestamp)!;
			currShape.description = action.payload.desc;

			return {
				...state,
				shapes: shapes
			};
		}

		case ADD_ARROW: {

			// Since we deep copy shapes and we want to push to "connectedTo"
			// and "connectedToMe" the references, we'll find them in shapes object instead of
			// point them to action.payload.source/target.
			
			// Complexity: O(2 * |Shapes|)
			//const sourceShape = state.shapes.find(s => s.timestamp === action.payload.source.timestamp)!;
			//const targetShape = state.shapes.find(s => s.timestamp === action.payload.target.timestamp)!;

			// Complextiy: O(1)
			const sourceShape = action.payload.source;
			const targetShape = action.payload.target;

			// If there is already an Arrow between them, we won't do it again
			if(state.arrows.get([sourceShape, targetShape])) {
				return state;
			}

			// If there is an opposite Arrow, we'll return the previous state and
			// will return an Error
			if(state.arrows.get([targetShape, sourceShape])) {
				// TODO: Make an error here, it could be down by dispatch to new reducer.
				console.log("Error, cannot make opposite arrow.")
				return state;
			}
			
			//sourceShape.connectedTo.push(targetShape);
			//targetShape.connectedToMe.push(sourceShape);

			const arrowsClone = new Map<[Shape, Shape], AllActivationFunctions>(state.arrows);

			
			arrowsClone.set([sourceShape, targetShape], null);
			
			/*const newArrow : Arrow = {
				source: action.payload.source,
				target: action.payload.target
			};*/

			//sourceShape.associatedArrows.push(newArrow);
			//targetShape.associatedArrows.push(newArrow);

			return {
				...state,
				shapes: shapes,
				//arrows: [...state.arrows, newArrow]
				arrows: arrowsClone
			};
		}
		
		/*
		case UPDATE_SHAPE_ARROWS:
			// Once we moved a shape, we need to update:
			// 1. The arrows connected to this shape
			// 2. The arrows that coming out from the shape

			const currShape = shapes.find(s => s.timestamp === action.meta.timestamp)!;

			return {
				...state
			}*/

		default:
			return state;
	}
}