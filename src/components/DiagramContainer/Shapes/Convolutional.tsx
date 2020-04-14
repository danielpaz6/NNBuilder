import * as React from 'react';
import { IDraggableShape } from "../../../interfaces/shapes";


// Positioning
const WIDTH = 30;
const HEIGHT = 30;
const PADDING = 5;
const OFFSET = 2;

// Styling Component
const BG1 = "#edffea";
const BG2 = "#75daad";
const BORDER1 = "#75daad";
const BORDER2 = "#75daad";
const BORDER_ACTIVE = "orange";

export default class Convolutional extends React.Component<IDraggableShape> {
	public render() {
		console.log("Rect State", this.props);
		return (
			<svg 
				x={this.props.x}
				y={this.props.y}
				onPointerDown={this.props.handlePointerDown}
				onPointerUp={this.props.handlePointerUp}
				onPointerMove={this.props.handlePointerMove}
				fill={this.props.active ? "blue" : "black"}>
					<title>Convolutional Layer</title>
					
					<rect id="svg_1" height={HEIGHT} width={WIDTH} y={OFFSET} x={OFFSET + PADDING} strokeWidth="1" stroke={this.props.active ? BORDER_ACTIVE : BORDER1} fill={BG1}></rect>
					<rect id="svg_2" height={HEIGHT} width={WIDTH} y={OFFSET + PADDING} x={OFFSET + PADDING*2} strokeWidth="1" stroke={this.props.active ? BORDER_ACTIVE : BORDER2} fill={BG2}></rect>
					<rect id="svg_3" height={HEIGHT} width={WIDTH} y={OFFSET + PADDING*2} x={OFFSET + PADDING*3} strokeWidth="1" stroke={this.props.active ? BORDER_ACTIVE : BORDER1} fill={BG1}></rect>
					<rect id="svg_4" height={HEIGHT} width={WIDTH} y={OFFSET + PADDING*3} x={OFFSET + PADDING*4} strokeWidth="1" stroke={this.props.active ? BORDER_ACTIVE : BORDER2} fill={BG2}></rect>
			</svg>
		);
	}
}
