import * as React from 'react';
import { IDraggableShape } from "../../../interfaces/shapes";

// Positioning
const WIDTH = 30;
const HEIGHT = 90;
const OFFSET = 2;

// Styling Component
const BG = "#fcf7bb";
const BORDER = "#f6d186";
//const BORDER_ACTIVE = "orange";
const BORDER_ACTIVE = "red";

export default class FullyConnected extends React.Component<IDraggableShape> {
	static centerPosition = [WIDTH / 2, HEIGHT / 2];
	
	public render() {
		return (
			<React.Fragment>
				<title>Fully Connected Layer</title>
				<rect id="svg_1" height={HEIGHT} width={WIDTH} y={OFFSET} x={OFFSET} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER} fill={BG}></rect>
			</React.Fragment>
		);
	}
}
