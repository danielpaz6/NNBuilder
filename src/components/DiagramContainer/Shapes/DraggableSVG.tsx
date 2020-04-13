import * as React from 'react';
import { IDraggableSVGState } from './shape';

export interface IDraggableSVGProps {
	render: any
}

export default class DraggableSVG extends React.Component<IDraggableSVGProps, IDraggableSVGState> {
	constructor(props: IDraggableSVGProps) {
		super(props);

		this.state = {
			x: 100,
			y: 100,
			active: false,
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
			active: true,
			offset: {
				x,
				y
			}
		});
	};

	handlePointerMove = (e: React.PointerEvent<EventTarget>) => {
		const el = e.target as HTMLInputElement;
		const bbox = el.getBoundingClientRect();
		const x = e.clientX - bbox.left;
		const y = e.clientY - bbox.top;

		const newX = this.state.x - (this.state.offset.x - x);
		const newY = this.state.y - (this.state.offset.y - y);

		if (this.state.active) {
			this.setState({
				x: newX < 0 ? 0 : newX,
				y: newY < 0 ? 0 : newY
			});
		}
	};

	handlePointerUp = () => {
		this.setState({
			active: false
		});
	};

	public render() {
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
				handlePointerDown: this.handlePointerDown,
				handlePointerMove: this.handlePointerMove,
				handlePointerUp: this.handlePointerUp
			})
		);
	}
}
