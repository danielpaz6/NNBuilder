import * as React from 'react';
import { IDraggableShape } from "../../../interfaces/shapes";

// Positioning
const WIDTH = 20;
const HEIGHT = 40;
const PADDING = 40;
const OFFSET = 2;

// Styling Component
const BG = "#f3e2f7";
const BORDER = "#b89acf";
const BORDER_ACTIVE = "red";

const filledTemplateStyle = {
	width: 20,
	height: 40,
	padding: 40,
	offset: 2,
	bg: "#f3e2f7",
	border: "#b89acf",
	borderActive: "red"
}

const abstractTemplateStyle = {
	width: 80,
	height: 70,
	offset: 2,
	bg: "#fff2cc",
	border: "#8d8c89",
	borderActive: "red"
}

export default class Concatenate extends React.Component<IDraggableShape> {
	static centerPosition = [WIDTH / 2, HEIGHT * 3 / 2];
	static centerPositionAbstract = [(abstractTemplateStyle.width + abstractTemplateStyle.offset*2) / 2,
		(abstractTemplateStyle.height + abstractTemplateStyle.offset*2) / 2];

	public renderFilledTemplate() {
		return (
			<React.Fragment>
				<title>Concatenate Layer</title>
				
				<rect id="svg_1" height={HEIGHT} width={WIDTH} y={OFFSET} x={OFFSET} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER} fill={BG}></rect>
				<rect id="svg_2" height={HEIGHT} width={WIDTH} y={OFFSET + PADDING} x={OFFSET} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER} fill={BG}></rect>
				<rect id="svg_3" height={HEIGHT} width={WIDTH} y={OFFSET + PADDING*2} x={OFFSET} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER} fill={BG}></rect>
			</React.Fragment>
		);
	}

	public renderAbstractTemplate() {
		return (
			<React.Fragment>
				<title>Concatenate Layer</title>
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
							<tspan x="50%" dy="1.2em">Concatenate</tspan>
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
