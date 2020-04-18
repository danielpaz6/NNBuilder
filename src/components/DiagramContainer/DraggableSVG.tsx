import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { editActiveShape, updateShapePositionAction, addArrowAndUpdateConnections } from '../../store/shapes/actions';
import { updateMouseLocation } from '../../store/mouse/actions';
import { ShapeState, Shape } from '../../store/shapes/types';

export interface IDraggableSVGProps {
	currentShape: Shape;
	shapes: ShapeState;
	children: React.ReactNode;
	editActiveShape: typeof editActiveShape;
	updateShapePositionAction: typeof updateShapePositionAction;
	addArrowAndUpdateConnections: typeof addArrowAndUpdateConnections;
	updateMouseLocation: typeof updateMouseLocation;
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
	// and also a pure component
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
			// Then we'll remove the active shape.
			if(this.props.shapes.sourceShape && this.props.shapes.sourceShape.timestamp !== this.props.currentShape.timestamp) {
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
		if(this.state.x === this.state.historyX && this.state.y === this.state.historyY)
		{
			// Sets the current shape as the active shape
			this.props.editActiveShape(
				this.props.currentShape.timestamp
			);

			// Once we updated the active shape, to avoid mouse glitching,
			// we'll set the location of the mouse position to be the active shape

			this.props.updateMouseLocation(
				this.state.x + this.props.currentShape.centerPosition[0],
				this.state.y + this.props.currentShape.centerPosition[1]
			);

			// Once we confirmed that the shape didn't move,
			// We'll check if the currentShape isn't equal the active shape and check if we should draw a line between
			// the target shape and the current one

			// 1. Checking if targetShape exists and edge case
			// where the source Shape equals to the current Shape
			if(this.props.shapes.sourceShape && this.props.shapes.sourceShape.timestamp !== this.props.currentShape.timestamp) {
				
				// Then, we'll make sure there isn't an arrow already between source and target
				// We can check it in the connected list of the source shape
				
				if(this.props.shapes.sourceShape.connectedTo.filter(s => s.timestamp === this.props.currentShape.timestamp).length === 0)
				{
					// If we got this far, we'll draw an arrow between source and target shapes

					const getSourceShape = this.props.shapes.sourceShape;
					const getTargetShape = this.props.shapes.shapes.find(s => s.timestamp === this.props.currentShape.timestamp);
					
					this.props.addArrowAndUpdateConnections(new Date().getTime(), getSourceShape, getTargetShape!);
				}
			}
		}
		
	};

	public render() {
		// Edge case: if we change the shape location from the Details Bar,
		// it means that the current shape is the sourceShape,
		// to avoid cases where we need to choose between sourceShape and this state

		// we'll simply use this.props.currentShape to display the shape location

		console.log("RENDERING DRAGGABLESVG!");

		return (
			/*this.props.render({
				...this.state,
				active: isShapeActive,
				handlePointerDown: this.handlePointerDown,
				handlePointerMove: this.handlePointerMove,
				handlePointerUp: this.handlePointerUp
			})*/

			<svg 
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
	shapes: state.shapes
});

export default connect(
	mapStateToProps,
	{ editActiveShape, updateShapePositionAction, addArrowAndUpdateConnections, updateMouseLocation }
)(DraggableSVG);