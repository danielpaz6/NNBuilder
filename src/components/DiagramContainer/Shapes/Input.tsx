import * as React from 'react';
import { IDraggableShape } from "../../../interfaces/shapes";

// Positioning
const WIDTH = 40;
const HEIGHT = 40;
const OFFSET = 2;

// Styling Component
const BG = "#f1f3f4";
const BORDER = "#79bac1";
//const BORDER_ACTIVE = "orange";
const BORDER_ACTIVE = "red";

export default class Input extends React.Component<IDraggableShape> {
	static centerPosition = [(WIDTH + OFFSET) / 2, (HEIGHT + OFFSET) / 2];
	
	public render() {
		return (
			<React.Fragment>
				<title>Input Layer</title>
				<rect id="svg_1" height={HEIGHT} width={WIDTH} y={OFFSET} x={OFFSET} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER} fill={BG}></rect>
			</React.Fragment>
		);
	}
}
