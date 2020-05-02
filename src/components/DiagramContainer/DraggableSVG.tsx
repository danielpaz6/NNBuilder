import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { editActiveShape, updateShapePositionAction, addArrowAndUpdateConnections } from '../../store/shapes/actions';
import { updateMouseLocation } from '../../store/mouse/actions';
import { addToast } from '../../store/toasts/actions';
import { ShapeState } from '../../store/shapes/types';
import { manhattanDistance } from '../../utils/distance';
import { isValidArrow } from '../../model/checkArrow';
import { Shape } from '../../interfaces/IShape';

import './diagram.scss';

export interface IDraggableSVGProps {
	currentShape: Shape;
	shapes: ShapeState;
	children: React.ReactNode;
	isMarked: boolean;
	editActiveShape: typeof editActiveShape;
	updateShapePositionAction: typeof updateShapePositionAction;
	addArrowAndUpdateConnections: typeof addArrowAndUpdateConnections;
	updateMouseLocation: typeof updateMouseLocation;
	addToast: typeof addToast;
}

// We must maintain a local state in addition to the redux shape attributes
// so we could move shapes that are not targeted.

export interface IDraggableSVGState {
	x: number;
	y: number;
	historyX: number;
	historyY: number;
	currentMove: boolean;
	offset: {
		x: number;
		y: number;
	}
}

class DraggableSVG extends React.PureComponent<IDraggableSVGProps, IDraggableSVGState> {
	constructor(props: IDraggableSVGProps) {
		super(props);

		this.state = {
			x: this.props.currentShape.x,
			y: this.props.currentShape.y,
			historyX: 100,
			historyY: 100,
			currentMove: false,
			offset: {
				x: 0,
				y: 0
			}
		}
	}

	// TODO: use this component to avoid wasted rendering.
	/*shouldComponentUpdate() {
		return false;
	}*/

	handlePointerDown = (e : React.PointerEvent<EventTarget>) => {
		const el = e.target as HTMLInputElement;
		const bbox = el.getBoundingClientRect();
		const x = e.clientX - bbox.left;
		const y = e.clientY - bbox.top;

		el.setPointerCapture(e.pointerId);
		this.setState((oldState) => ({
			currentMove: true,
			historyX: oldState.x,
			historyY: oldState.y,
			offset: {
				x,
				y
			}})
		);
	};


	// TODO: Math.floor the position, this will improve the performance significantly.
	handlePointerMove = (e: React.PointerEvent<EventTarget>) => {
		const el = e.target as HTMLInputElement;
		const bbox = el.getBoundingClientRect();
		const x = e.clientX - bbox.left;
		const y = e.clientY - bbox.top;

		const newX = this.state.x - (this.state.offset.x - x);
		const newY = this.state.y - (this.state.offset.y - y);
		
		if (this.state.currentMove) {
			
			// we might pass this local state since we use redux
			this.setState({
				x: newX < 0 ? 0 : newX,
				y: newY < 0 ? 0 : newY
			});

			// Update the position of the current shape in the redux
			this.props.updateShapePositionAction(
				this.props.currentShape.timestamp,
				newX < 0 ? 0 : newX,
				newY < 0 ? 0 : newY
				//this.state.x,
				//this.state.y
			);

			// If the current shape moved and is not the active shape
			// Then we'll remove the active shape (after a certain threshold of the manhattan distance).
			if(
				this.props.shapes.sourceShape &&
				this.props.shapes.sourceShape.timestamp !== this.props.currentShape.timestamp &&
				Math.abs(manhattanDistance(this.state.x, this.state.y, this.state.historyX, this.state.historyY)) > 10
			) {
				this.props.editActiveShape(
					-1
				);
			}
		}
	};

	handlePointerUp = () => {
		this.setState({
			currentMove: false
		});

		// If the user just clicked on a shape without moving it, then we'll select it
		// And since the position is so sensitive, we'll check if the distance between
		// the position when we start clicked on the shape and when we stopped moving it
		// is |distance| < 5 in manhattan distance ( which is the cheaper to calculate )
		
		if(Math.abs(manhattanDistance(this.state.x, this.state.y, this.state.historyX, this.state.historyY)) < 6)
		{
			// Once we updated the active shape, to avoid mouse glitching,
			// we'll set the location of the mouse position to be the active shape

			this.props.updateMouseLocation(
				this.state.x + this.props.currentShape.centerPosition[0],
				this.state.y + this.props.currentShape.centerPosition[1]
			);

			// Once we confirmed that the shape didn't move ( in our distance definition ),
			// We'll check if the currentShape isn't equal the active shape and check if we should draw a line between
			// the target shape and the current one

			// 1. Checking if targetShape exists and edge case
			// where the source Shape equals to the current Shape
			if(this.props.shapes.sourceShape && this.props.shapes.sourceShape.timestamp !== this.props.currentShape.timestamp)
			{	
				// Then, we'll make sure there isn't an arrow already between source and target
				// We can check it in the connected list of the source shape
				
				const getSourceShape = this.props.shapes.sourceShape;

				// Complexity: O(|Shapes|)
				//const getTargetShape = this.props.shapes.shapes.find(s => s.timestamp === this.props.currentShape.timestamp);

				// Complexity: O(1)
				
				// isValid also creates a toast if it doesn't successed.
				if(isValidArrow(getSourceShape, this.props.currentShape, this.props.shapes.arrows, this.props.addToast))
				{
					this.props.addArrowAndUpdateConnections(getSourceShape, this.props.currentShape);
				}

				/*if(this.props.shapes.sourceShape.connectedTo.filter(s => s.timestamp === this.props.currentShape.timestamp).length === 0)
				{
					// If we got this far, we'll draw an arrow between source and target shapes

					const getSourceShape = this.props.shapes.sourceShape;
					const getTargetShape = this.props.shapes.shapes.find(s => s.timestamp === this.props.currentShape.timestamp);
					
					this.props.addArrowAndUpdateConnections(new Date().getTime(), getSourceShape, getTargetShape!);
				}*/
			}

			// Sets the current shape as the active shape
			this.props.editActiveShape(
				this.props.currentShape.timestamp
			);
		}
	};

	// Edge case: if we change the shape location from the Details Bar,
	// it means that the current shape is the sourceShape,
	// to avoid cases where we need to choose between sourceShape and this state

	// we'll simply use this.props.currentShape to display the shape location
	public render() {

		return (
			<svg 
				className="draggableSVG"
				x={this.props.currentShape.x}
				y={this.props.currentShape.y}
				onPointerDown={this.handlePointerDown}
				onPointerUp={this.handlePointerUp}
				onPointerMove={this.handlePointerMove}>
					{this.props.children}
			</svg>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	shapes: state.shapes,
	toasts: state.toasts
});

export default connect(
	mapStateToProps,
	{ 
		editActiveShape, 
		updateShapePositionAction, 
		addArrowAndUpdateConnections, 
		updateMouseLocation,
		addToast
	}
)(DraggableSVG);