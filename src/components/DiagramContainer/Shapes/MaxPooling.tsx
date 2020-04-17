import * as React from 'react';
import { IDraggableShape } from "../../../interfaces/shapes";

// Positioning
const WIDTH = 30;
const HEIGHT = 30;
const PADDING = 12;
const OFFSET = 2;

// Styling Component
const BG1 = "#ffb6b9";
const BG2 = "#fae3d9";
const BG3 = "#bbded6";
const BORDER1 = "#FF9A9E";
const BORDER2 = "#FFC7AF";
const BORDER3 = "#92DFCD";
const BORDER_ACTIVE = "red";

export default class MaxPooling extends React.Component<IDraggableShape> {
	// I'll leave it 3/2 since this "3" should be variable in the future, it's
	// the number of boxes we display
	static centerPosition = [WIDTH / 2 + (PADDING) * 3 / 2, HEIGHT / 2 + (PADDING) * 3 / 2];

	public render() {
		return (
			<svg 
				x={this.props.x}
				y={this.props.y}
				onPointerDown={this.props.handlePointerDown}
				onPointerUp={this.props.handlePointerUp}
				onPointerMove={this.props.handlePointerMove}
				fill={this.props.active ? "blue" : "black"}>
					<title>Max Pooling Layer</title>
					
					<rect id="svg_1" height={HEIGHT} width={WIDTH} y={OFFSET} x={OFFSET + PADDING} strokeWidth="1" stroke={this.props.active ? BORDER_ACTIVE : BORDER1} fill={BG1} rx="1"></rect>
					<rect id="svg_2" height={HEIGHT} width={WIDTH} y={OFFSET + PADDING} x={OFFSET + PADDING*2} strokeWidth="1" stroke={this.props.active ? BORDER_ACTIVE : BORDER2} fill={BG2} rx="1"></rect>
					<rect id="svg_3" height={HEIGHT} width={WIDTH} y={OFFSET + PADDING*2} x={OFFSET + PADDING*3} strokeWidth="1" stroke={this.props.active ? BORDER_ACTIVE : BORDER3} fill={BG3} rx="1"></rect>
			</svg>
		);
	}
}
