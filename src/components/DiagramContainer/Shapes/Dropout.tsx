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

const filledTemplateStyle = {
	width: 12,
	height: 12,
	offset: 2,
	bg: "#fdd998",
	border: "#f5b971",
	borderActive: "red"
}

const abstractTemplateStyle = {
	width: 70,
	height: 70,
	offset: 2,
	bg: "#dae7fc",
	border: "#909da6",
	borderActive: "red"
}

export default class Dropout extends React.Component<IDraggableShape> {
	static centerPosition = [WIDTH * 3 / 2, HEIGHT * 3 / 2];
	static centerPositionAbstract = [(abstractTemplateStyle.width + abstractTemplateStyle.offset*2) / 2,
		(abstractTemplateStyle.height + abstractTemplateStyle.offset*2) / 2];

	public renderFilledTemplate() {
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

	public renderAbstractTemplate() {
		return (
			<React.Fragment>
				<title>Dropout Layer</title>
				<rect 
					height={abstractTemplateStyle.height} 
					width={abstractTemplateStyle.width} 
					y={abstractTemplateStyle.offset} 
					x={abstractTemplateStyle.offset} 
					strokeWidth="1" 
					stroke={this.props.isMarked ? abstractTemplateStyle.borderActive : abstractTemplateStyle.border} 
					fill={abstractTemplateStyle.bg}></rect>
				<svg 
					height={abstractTemplateStyle.height} 
					width={abstractTemplateStyle.width} >
					<text 
						x="50%" 
						y="36%" 
						alignmentBaseline="middle" 
						textAnchor="middle" 
						fontSize="10px">
							<tspan x="50%" dy="1.2em">Dropout</tspan>
							<tspan x="50%" dy="1.2em">Layer</tspan>
					</text>
				</svg>
			</React.Fragment>
		);
	}

	public render() {
		return this.renderAbstractTemplate();
	}
}
