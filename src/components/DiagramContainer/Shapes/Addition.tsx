import * as React from 'react';
import { IDraggableShape } from "../../../interfaces/shapes";

// Positioning
const WIDTH = 50;
//const PADDING = 12;
const OFFSET = 2;

// Styling Component
const BG = "#deffe9";
const BORDER = "#95e7b0";
const BORDER_ACTIVE = "red";

export default class Addition extends React.Component<IDraggableShape> {
	static centerPosition = [WIDTH / 2, WIDTH / 2];

	public render() {
		const transformSize = (2*WIDTH + 80 * 0.25) / 2 - 3;
		return (
			<React.Fragment>
				<title>Addition Layer</title>
				<rect id="svg_1" height={WIDTH} width={WIDTH} y={OFFSET} x={OFFSET} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER} fill={BG} rx={WIDTH / 2}></rect>
				<polygon
					transform={`scale(0.25) translate(${transformSize},${transformSize})`}
					x={OFFSET + WIDTH / 2}
					y={OFFSET + WIDTH / 2}
					points="2 37, 37 37, 37 2, 67 2, 67 37, 102 37, 102 67, 67 67, 67 102, 37 102, 37 67, 2 67"
					stroke={BORDER}
					fill={BORDER}
				strokeWidth="2"/>
			</React.Fragment>
		);
	}
}
