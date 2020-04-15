import * as React from 'react';
import { IDraggableSVGState } from "../../../interfaces/shapes";
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import { editActiveShape, updateShapePositionAction } from '../../../store/shapes/actions';

export interface IDraggableSVGProps {
	render: any,
	id: number,
	active: boolean,
	editActiveShape: typeof editActiveShape,
	updateShapePositionAction: typeof updateShapePositionAction
}

class DraggableSVG extends React.Component<IDraggableSVGProps, IDraggableSVGState> {
	constructor(props: IDraggableSVGProps) {
		super(props);

		this.state = {
			x: 100,
			y: 100,
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
		this.setState({
			currentMove: true,
			offset: {
				x,
				y
			}
		});

		this.props.editActiveShape(
			this.props.id,
			true
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
	};

	public render() {
		console.log("render", this.state, this.props.active);	
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
				active: this.props.active,
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
	{ editActiveShape, updateShapePositionAction }
)(DraggableSVG);