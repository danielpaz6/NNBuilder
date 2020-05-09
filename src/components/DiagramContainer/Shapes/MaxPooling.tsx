import * as React from 'react';
import { IDraggableShape } from "../../../interfaces/shapes";
import { TEMPLATE_ABSTRACT } from '../../../interfaces/designTemplates';

// Positioning
const WIDTH = 30;
const HEIGHT = 30;
const PADDING = 12;
const OFFSET = 2;

// Styling Component
const BG1 = "#ffb6b9";
const BG2 = "#fae3d9";
const BG3 = "#bbded6";
const BORDER1 = "#FF9A9E";
const BORDER2 = "#FFC7AF";
const BORDER3 = "#92DFCD";
const BORDER_ACTIVE = "red";

const filledTemplateStyle = {
	width: 30,
	height: 30,
	padding: 12,
	offset: 2,
	bg1: "#ffb6b9",
	bg2: "#fae3d9",
	bg: "#bbded6",
	border1: "#FF9A9E",
	border2: "#FFC7AF",
	border3: "#92DFCD",
	borderActive: "red"
}

const abstractTemplateStyle = {
	width: 90,
	height: 70,
	offset: 2,
	bg: "#dae7fc",
	border: "#909da6",
	borderActive: "red",
	count: 5,
	padding: 10
}

export default class MaxPooling extends React.Component<IDraggableShape> {
	// I'll leave it 3/2 since this "3" should be variable in the future, it's
	// the number of boxes we display
	static centerPosition = [WIDTH / 2 + (PADDING) * 3 / 2, HEIGHT / 2 + (PADDING) * 3 / 2];

	static centerPositionAbstract = [(abstractTemplateStyle.width + abstractTemplateStyle.padding*abstractTemplateStyle.count) / 2,
		(abstractTemplateStyle.height + abstractTemplateStyle.padding*abstractTemplateStyle.count) / 2];

	public renderFilledTemplate() {
		return (
			<React.Fragment>
				<title>Max Pooling Layer</title>
				
				<rect id="svg_1" height={HEIGHT} width={WIDTH} y={OFFSET} x={OFFSET + PADDING} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER1} fill={BG1} rx="1"></rect>
				<rect id="svg_2" height={HEIGHT} width={WIDTH} y={OFFSET + PADDING} x={OFFSET + PADDING*2} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER2} fill={BG2} rx="1"></rect>
				<rect id="svg_3" height={HEIGHT} width={WIDTH} y={OFFSET + PADDING*2} x={OFFSET + PADDING*3} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER3} fill={BG3} rx="1"></rect>
			</React.Fragment>
		);
	}

	public renderAbstractTemplate() {
		const arr = new Array(abstractTemplateStyle.count).fill(0);

		return (
			<React.Fragment>
				<title>Max Pooling Layer</title>
				{
					arr.map((_, index) => 
					<rect 
						key={index}
						height={abstractTemplateStyle.height} 
						width={abstractTemplateStyle.width} 
						x={abstractTemplateStyle.offset + abstractTemplateStyle.padding*index} 
						y={abstractTemplateStyle.offset + abstractTemplateStyle.padding*index} 
						strokeWidth="1" 
						stroke={this.props.isMarked ? abstractTemplateStyle.borderActive : abstractTemplateStyle.border} 
						fill={abstractTemplateStyle.bg}></rect>
				)}
				<svg 
					width={abstractTemplateStyle.width}
					height={abstractTemplateStyle.height} 
					x={abstractTemplateStyle.padding*(arr.length-1)}
					y={abstractTemplateStyle.padding*(arr.length-1)}
					>
					<text 
						x="50%" 
						y="20%" 
						alignmentBaseline="middle" 
						textAnchor="middle" 
						fontSize="12px">
							<tspan x="50%" dy="1.2em">Max Pooling</tspan>
    						<tspan x="50%" dy="1.2em">Layer</tspan>
							{
								this.props.additionalInfo &&
							<tspan x="50%" dy="1.8em" fontSize="10px">{this.props.additionalInfo.kernelSize}x{this.props.additionalInfo.kernelSize}&nbsp;&nbsp;&nbsp;(stride None)</tspan>
							}
					</text>
				</svg>
			</React.Fragment>
		);
	}

	public render() {
		switch(this.props.templateDesign)
		{
			case TEMPLATE_ABSTRACT:
				return this.renderAbstractTemplate();
			default:
				return this.renderFilledTemplate();
		}
	}
}
