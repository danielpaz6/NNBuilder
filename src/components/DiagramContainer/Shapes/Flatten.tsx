import * as React from 'react';
import { IDraggableShape } from "../../../interfaces/shapes";
import { TEMPLATE_ABSTRACT } from '../../../interfaces/designTemplates';

// Positioning
const WIDTH = 20;
const HEIGHT = 150;
const OFFSET = 2;

// Styling Component
const BG = "#FFBCB7";
const BORDER = "#FF7E75";
const BORDER_ACTIVE = "#fd5e53";

const filledTemplateStyle = {
	width: 20,
	height: 150,
	offset: 2,
	bg: "#FFBCB7",
	border: "#FF7E75",
	borderActive: "red"
}

const abstractTemplateStyle = {
	width: 35,
	height: 200,
	offset: 2,
	bg: "#dae7fc",
	border: "#909da6",
	borderActive: "red"
}

export default class Flatten extends React.Component<IDraggableShape> {
	static centerPosition = [WIDTH / 2, HEIGHT / 2];
	static centerPositionAbstract = [(abstractTemplateStyle.width + abstractTemplateStyle.offset*2) / 2,
		(abstractTemplateStyle.height + abstractTemplateStyle.offset*2) / 2];

	public renderFilledTemplate() {
		return (
			<React.Fragment>
				<title>Flatten Layer</title>
				<rect id="svg_1" height={HEIGHT} width={WIDTH} y={OFFSET} x={OFFSET} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER} fill={BG}></rect>
			</React.Fragment>
		);
	}

	public renderAbstractTemplate() {
		return (
			<React.Fragment>
				<title>Flatten Layer</title>
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
						fontSize="10px">
							<tspan x="55%" dy="1.2em">Flatten</tspan>
    						<tspan x="55%" dy="1.2em">Layer</tspan>
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
