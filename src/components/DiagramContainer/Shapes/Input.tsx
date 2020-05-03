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

const filledTemplateStyle = {
	width: 40,
	height: 40,
	offset: 2,
	bg: "#f1f3f4",
	border: "#79bac1",
	borderActive: "red"
}

const abstractTemplateStyle = {
	width: 100,
	height: 100,
	offset: 2,
	bg: "#dae7fc",
	border: "#909da6",
	borderActive: "red"
}

export default class Input extends React.Component<IDraggableShape> {
	static centerPosition = [(WIDTH + OFFSET) / 2, (HEIGHT + OFFSET) / 2];
	static centerPositionAbstract = [(abstractTemplateStyle.width + abstractTemplateStyle.offset*2) / 2,
		(abstractTemplateStyle.height + abstractTemplateStyle.offset*2) / 2];
	
	public renderFilledTemplate() {
		return (
			<React.Fragment>
				<title>Input Layer</title>
				<rect id="svg_1" height={HEIGHT} width={WIDTH} y={OFFSET} x={OFFSET} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER} fill={BG}></rect>
			</React.Fragment>
		);
	}

	public renderAbstractTemplate() {
		return (
			<React.Fragment>
				<title>Input Layer</title>
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
						y="30%" 
						alignmentBaseline="middle" 
						textAnchor="middle" 
						fontSize="12px">
							<tspan x="50%" dy="1.2em">Input</tspan>
    						<tspan x="50%" dy="1.2em">Image</tspan>
    						<tspan x="50%" dy="1.8em" fontSize="10px">28x28</tspan>
					</text>
				</svg>
			</React.Fragment>
		);
	}

	public render() {
		return this.renderAbstractTemplate();
	}
}
