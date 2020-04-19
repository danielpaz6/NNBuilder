import * as React from 'react';
import { IDraggableShape } from "../../../interfaces/shapes";

// Positioning
const WIDTH = 20;
const HEIGHT = 150;
const OFFSET = 2;

// Styling Component
const BG = "#FFBCB7";
const BORDER = "#FF7E75";
const BORDER_ACTIVE = "#fd5e53";

export default class Flatten extends React.Component<IDraggableShape> {
	static centerPosition = [WIDTH / 2, HEIGHT / 2];
	
	public render() {
		return (
			<React.Fragment>
				<title>Flatten Layer</title>
				<rect id="svg_1" height={HEIGHT} width={WIDTH} y={OFFSET} x={OFFSET} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER} fill={BG}></rect>
			</React.Fragment>
		);
	}
}
