import * as React from 'react';
import { IDraggableShape } from "../../../interfaces/shapes";

// Positioning
const WIDTH = 20;
const HEIGHT = 90;
const OFFSET = 2;

// Styling Component
const BG = "#eae7d9";
const BORDER = "#d2c6b2";
//const BORDER_ACTIVE = "orange";
const BORDER_ACTIVE = "red";

const filledTemplateStyle = {
	width: 20,
	height: 90,
	offset: 2,
	bg: "#eae7d9",
	border: "#d2c6b2",
	borderActive: "red"
}

const abstractTemplateStyle = {
	width: 80,
	height: 300,
	offset: 2,
	bg: "#dae7fc",
	border: "#909da6",
	borderActive: "red"
}

export default class Output extends React.Component<IDraggableShape> {
	static centerPosition = [(WIDTH + OFFSET) / 2, (HEIGHT + OFFSET) / 2];
	static centerPositionAbstract = [(abstractTemplateStyle.width + abstractTemplateStyle.offset*2) / 2,
		(abstractTemplateStyle.height + abstractTemplateStyle.offset*2) / 2];
	
	public renderFilledTemplate() {
		return (
			<React.Fragment>
				<title>Output Layer</title>
				<rect id="svg_1" height={HEIGHT} width={WIDTH} y={OFFSET} x={OFFSET} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER} fill={BG}></rect>
			</React.Fragment>
		);
	}

	public renderAbstractTemplate() {
		return (
			<React.Fragment>
				<title>Output Layer</title>
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
						y="45%" 
						alignmentBaseline="middle" 
						textAnchor="middle" 
						fontSize="12px">
							<tspan x="50%" dy="1.2em">Output</tspan>
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
