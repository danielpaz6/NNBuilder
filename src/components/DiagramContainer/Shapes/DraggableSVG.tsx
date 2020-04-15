import * as React from 'react';
import { IDraggableSVGState } from "../../../interfaces/shapes";
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import { editActiveShape, updateShapePositionAction } from '../../../store/shapes/actions';
import { Shape } from '../../../store/shapes/types';

export interface IDraggableSVGProps {
	render: any;
	id: number;
	targetShape?: Shape;
	editActiveShape: typeof editActiveShape;
	updateShapePositionAction: typeof updateShapePositionAction;
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
	};

	handlePointerMove = (e: React.PointerEvent<EventTarget>) => {
		const el = e.target as HTMLInputElement;
		const bbox = el.getBoundingClientRect();
		const x = e.clientX - bbox.left;
		const y = e.clientY - bbox.top;

		const newX = this.state.x - (this.state.offset.x - x);
		const newY = this.state.y - (this.state.offset.y - y);

		if (this.state.currentMove) {
			this.setState({
				x: newX < 0 ? 0 : newX,
				y: newY < 0 ? 0 : newY
			});
		}
	};

	handlePointerUp = () => {
		this.setState({
			currentMove: false
		});

		// Once stop moving ( releasing the mouse clicking ), we'll update the
		// position of the shape in the redux shapes list
		this.props.updateShapePositionAction(
			this.props.id,
			this.state.x,
			this.state.y
		);

		// If the user just clicked on a shape without moving it, then we'll select it
		if(this.state.x === this.state.historyX && this.state.y === this.state.historyY)
		{
			this.props.editActiveShape(
				this.props.id
			);
		}
	};

	public render() {
		console.log("render", this.state);	
		const isShapeActive = this.props.targetShape && this.props.targetShape.timestamp === this.props.id;
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
	targetShape: state.shapes.targetShape
});

export default connect(
	mapStateToProps,
	{ editActiveShape, updateShapePositionAction }
)(DraggableSVG);