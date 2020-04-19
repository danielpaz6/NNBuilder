import * as React from 'react';
import { IDraggableShape } from "../../../interfaces/shapes";

// Positioning
const WIDTH = 50;
const HEIGHT = 50;
const OFFSET = 4;

// Styling Component
const BG = "#ffecda";
const BORDER = "#d4a5a5";
//const BORDER_ACTIVE = "orange";
const BORDER_ACTIVE = "red";

export default class BatchNormalization extends React.Component<IDraggableShape> {
	static centerPosition = [WIDTH / 2, HEIGHT / 2];
	
	public render() {
		return (
			<React.Fragment>
				<title>Batch Normalization Layer</title>
				<polygon
					transform="scale(0.5)"
					x={OFFSET}
					y={OFFSET}
					points="32,2 72,2, 102,32, 102,72, 72,102 32,102 2,72 2,32"
					stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER}
					fill={BG}
					strokeWidth="3"/>

			</React.Fragment>
		);
	}
}
