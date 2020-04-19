import * as React from 'react';
import { IDraggableShape } from "../../../interfaces/shapes";

// Positioning
const WIDTH = 12;
const HEIGHT = 12;
const OFFSET = 2;

// Styling Component
const BG = "#fdd998";
const BORDER = "#f5b971";
//const BORDER_ACTIVE = "orange";
const BORDER_ACTIVE = "red";

export default class Dropout extends React.Component<IDraggableShape> {
	static centerPosition = [WIDTH * 3 / 2, HEIGHT * 3 / 2];
	
	public render() {
		const create = [0,1,2];
		return (
			<React.Fragment>
				<title>Dropout Layer</title>
				{
					create.map(i => 
						create.map(j => 
							<rect
								key={i + "," + j}
								id="svg_1"
								height={HEIGHT}
								width={WIDTH}
								x={OFFSET + WIDTH * i}
								y={OFFSET + HEIGHT * j}
								strokeWidth="1"
								stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER}
								fill={BG}></rect>
					))
				}
			</React.Fragment>
		);
	}
}
