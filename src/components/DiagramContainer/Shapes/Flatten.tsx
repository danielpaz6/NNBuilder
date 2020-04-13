import * as React from 'react';
import { IDraggableShape } from "./shape";

// Positioning
const WIDTH = 20;
const HEIGHT = 150;
const OFFSET = 2;

// Styling Component
const BG = "#FFBCB7";
const BORDER = "#FF7E75";
const BORDER_ACTIVE = "#fd5e53";

export default class Flatten extends React.Component<IDraggableShape> {
	public render() {
		return (
			<svg 
				x={this.props.x}
				y={this.props.y}
				onPointerDown={this.props.handlePointerDown}
				onPointerUp={this.props.handlePointerUp}
				onPointerMove={this.props.handlePointerMove}
				fill={this.props.active ? "blue" : "black"}>
					<title>Flatten Layer</title>
					
					<rect id="svg_1" height={HEIGHT} width={WIDTH} y={OFFSET} x={OFFSET} strokeWidth="1" stroke={this.props.active ? BORDER_ACTIVE : BORDER} fill={BG}></rect>
			</svg>
		);
	}
}
