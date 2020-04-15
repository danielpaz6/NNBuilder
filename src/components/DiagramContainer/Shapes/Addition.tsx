import * as React from 'react';
import { IDraggableShape } from "../../../interfaces/shapes";

// Positioning
const WIDTH = 350;
const PADDING = 12;
const OFFSET = 2;

// Styling Component
const BG1 = "#ABCDFF";
const BORDER_ACTIVE = "blue";

export default class Addition extends React.Component<IDraggableShape> {
	static centerPosition = [WIDTH / 2, WIDTH / 2];

	public render() {
		console.log("Rect State", this.props);
		return (
			<svg 
				x={this.props.x}
				y={this.props.y}
				viewBox={"-"+OFFSET+" -"+OFFSET+" " + WIDTH + " " + WIDTH}
				onPointerDown={this.props.handlePointerDown}
				onPointerUp={this.props.handlePointerUp}
				onPointerMove={this.props.handlePointerMove}
				fill={this.props.active ? BORDER_ACTIVE : BG1}>
					<title>Addition Layer</title>
					<rect width={WIDTH/20} height={WIDTH/20} fill="#fff" x={OFFSET} y={OFFSET} rx={WIDTH/2} />
					<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/>
			</svg>
		);
	}
}
