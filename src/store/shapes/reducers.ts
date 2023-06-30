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
	SET_SHAPE_ADDITONAL_INFO,
	Arrow,
	EDIT_ARROW_ACTIVATION,
	EDIT_ACTIVATION_FUNCTION,
	DELETE_ARROW,
	UPDATE_SHAPE_CENTER_POSITION,
	//UPDATE_SHAPE_ARROWS,
} from "./types";
import ArrowMap from "../../interfaces/arrowmap";
import {ACTIVATION_NONE} from "../../interfaces/activations";

const initialState: ShapeState = {
	shapes: [],
	//arrows: new Map<[Shape, Shape], AllActivationFunctions>()
	arrows: new ArrowMap()
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
				shapes: [...action.payload.shapes],
				arrows: action.payload.arrows || new ArrowMap(),
				sourceShape: undefined
			};

		case DELETE_SHAPE:
			if(state.sourceShape) {
				const copiedArrows = new ArrowMap(state.arrows);

				copiedArrows.deleteShapeArrows(state.sourceShape);

				return {
					...state,
					shapes: state.shapes.filter(
						shape => shape.timestamp !== state.sourceShape!.timestamp
					),
					sourceShape: undefined,
					arrows: copiedArrows
				};
			}
			
			return state;

		case DELETE_ARROW:
			if(state.sourceArrow) {
				const copiedArrows = new ArrowMap(state.arrows);
				copiedArrows.deleteArrow([state.sourceArrow.source, state.sourceArrow.target]);

				return {
					...state,
					arrows: copiedArrows
				}
			}

			return state;

		case UPDATE_SHAPE_CENTER_POSITION: {
			if(state.sourceShape) {

				const sourceShape = shapes.find(s => s.timestamp === state.sourceShape!.timestamp)!;
				
				// Re-assign the centerPosition, otherwise all layers will point to the same location.
				sourceShape.centerPosition = Object.assign({}, sourceShape.centerPosition);
				sourceShape.centerPosition[action.payload.template] = [...action.payload.newPosition];
				
				return {
					...state,
					shapes: shapes
				}
			}

			return state;
		}

		case EDIT_SHAPE_ACTIVATION: {
			const matchShape = state.shapes.find(s => s.timestamp === action.meta.timestamp);
			
			return {
				...state,
				sourceShape: matchShape,
				sourceArrow: action.meta.timestamp === -1 || matchShape ? undefined : state.sourceArrow
			}
		}

		case EDIT_ARROW_ACTIVATION: {
			
			const arrow: Arrow = {
				source: action.meta.sourceShape,
				target: action.meta.targetShape
			};

			return {
				...state,
				sourceArrow: arrow
			}
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
			//const sourceShape2 = state.shapes.find(s => s.timestamp === action.payload.source.timestamp)!;
			//const targetShape2 = state.shapes.find(s => s.timestamp === action.payload.target.timestamp)!;

			// Complextiy: O(1)
			const sourceShape = action.payload.source;
			const targetShape = action.payload.target;


			// If there is already an Arrow between them, we won't do it again
			if(state.arrows.has([sourceShape, targetShape])) {
				return state;
			}

			// If there is an opposite Arrow, we'll return the previous state and
			// will return an Error
			if(state.arrows.has([targetShape, sourceShape])) {
				return state;
			}
			
			//sourceShape.connectedTo.push(targetShape);
			//targetShape.connectedToMe.push(sourceShape);

			//const arrowsClone = new Map<[Shape, Shape], AllActivationFunctions>(state.arrows);
			const arrowsClone = new ArrowMap(state.arrows);

			
			arrowsClone.set([sourceShape, targetShape], ACTIVATION_NONE);
			
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

		case SET_SHAPE_ADDITONAL_INFO: {
			
			const currShape = shapes.find(s => s.timestamp === action.payload.timestamp)!;
			currShape.additionalInfo![action.payload.key] = action.payload.value;

			return {
				...state,
				shapes: shapes
			}
		}

		case EDIT_ACTIVATION_FUNCTION: {
			const copiedArrows = new ArrowMap(state.arrows);

			if(state.sourceArrow)
			{
				copiedArrows.set([state.sourceArrow.source, state.sourceArrow.target], action.payload.func);

				return {
					...state,
					arrows: copiedArrows
				}
			}

			return state;
		}

		default:
			return state;
	}
}