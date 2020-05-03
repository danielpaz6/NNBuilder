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

const filledTemplateStyle = {
	width: 50,
	height: 50,
	offset: 2,
	bg: "#ffecda",
	border: "#d4a5a5",
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

export default class BatchNormalization extends React.Component<IDraggableShape> {
	static centerPosition = [(WIDTH + OFFSET) / 2, (HEIGHT + OFFSET) / 2];
	static centerPositionAbstract = [(abstractTemplateStyle.width + abstractTemplateStyle.offset*2) / 2,
		(abstractTemplateStyle.height + abstractTemplateStyle.offset*2) / 2];
	
	public renderFilledTemplate() {
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

	public renderAbstractTemplate() {
		return (
			<React.Fragment>
				<title>Batch Normalization Layer</title>
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
							<tspan x="50%" dy="1.2em">Batch</tspan>
							<tspan x="50%" dy="1.2em" fontSize="8px">Normalization</tspan>
					</text>
				</svg>
			</React.Fragment>
		);
	}

	public render() {
		return this.renderAbstractTemplate();
	}
}
