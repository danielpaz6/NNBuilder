import * as React from 'react';
import { IDraggableSVGState } from "../../../interfaces/shapes";
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import { editActiveShape, updateShapePositionAction, addArrowAndUpdateConnections } from '../../../store/shapes/actions';
import { ShapeState } from '../../../store/shapes/types';

export interface IDraggableSVGProps {
	render: any;
	id: number;
	shapes: ShapeState;
	editActiveShape: typeof editActiveShape;
	updateShapePositionAction: typeof updateShapePositionAction;
	addArrowAndUpdateConnections: typeof addArrowAndUpdateConnections;
}

class DraggableSVG extends React.Component<IDraggableSVGProps, IDraggableSVGState> {
	constructor(props: IDraggableSVGProps) {
		super(props);

		this.state = {
			x: 100,
			y: 100,
			historyX: 100,
			historyY: 100,
			currentMove: false,
			offset: {
				x: 0,
				y: 0
			}
		}
	}

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

		// Once we clicked on a shape, we'll check if we should draw a line between
		// the target shape and the current one

		// 1. Checking if targetShape exists and edge case
		// where the source Shape equals to the current Shape
		if(this.props.shapes.sourceShape && this.props.shapes.sourceShape.timestamp !== this.props.id) {
			
			// Then, we'll make sure there isn't an arrow already between source and target
			// We can check it in the connected list of the source shape
			
			if(this.props.shapes.sourceShape.connectedTo.filter(s => s.timestamp === this.props.id).length === 0)
			{
				// If we got this far, we'll draw an arrow between source and target shapes

				const getSourceShape = this.props.shapes.sourceShape;
				const getTargetShape = this.props.shapes.shapes.find(s => s.timestamp === this.props.id);
				
				this.props.addArrowAndUpdateConnections(new Date().getTime(), getSourceShape, getTargetShape!);
			}
		}
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
				this.props.id,
				this.state.x,
				this.state.y
			);
		}
	};

	handlePointerUp = () => {
		this.setState({
			currentMove: false
		});

		// If the user just clicked on a shape without moving it, then we'll select it
		if(this.state.x === this.state.historyX && this.state.y === this.state.historyY)
		{
			this.props.editActiveShape(
				this.props.id
			);
		}
	};

	public render() {
		//console.log("render", this.state);	
		const isShapeActive = this.props.shapes.sourceShape && this.props.shapes.sourceShape.timestamp === this.props.id;
		return (
			/*this.props.render({
				cx: this.state.x,
				cy: this.state.y,
				onPointerDown: this.handlePointerDown,
				onPointerUp: this.handlePointerUp,
				onPointerMove: this.handlePointerMove,
				active: this.state.active
			})*/
			
			this.props.render({
				...this.state,
				active: isShapeActive,
				handlePointerDown: this.handlePointerDown,
				handlePointerMove: this.handlePointerMove,
				handlePointerUp: this.handlePointerUp
			})
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	shapes: state.shapes
});

export default connect(
	mapStateToProps,
	{ editActiveShape, updateShapePositionAction, addArrowAndUpdateConnections }
)(DraggableSVG);