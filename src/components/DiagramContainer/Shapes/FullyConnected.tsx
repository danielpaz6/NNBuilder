import * as React from 'react';
import { IDraggableShape } from "../../../interfaces/shapes";

// Positioning
const WIDTH = 30;
const HEIGHT = 90;
const OFFSET = 2;

// Styling Component
const BG = "#fcf7bb";
const BORDER = "#f6d186";
//const BORDER_ACTIVE = "orange";
const BORDER_ACTIVE = "red";

const filledTemplateStyle = {
	width: 30,
	height: 90,
	offset: 2,
	bg: "#fcf7bb",
	border: "#f6d186",
	borderActive: "red"
}

export const abstractTemplateStyle = {
	width: 30,
	offset: 2,
	bg: "#dae7fc",
	border: "#909da6",
	borderActive: "red",
	count: 7
}

export default class FullyConnected extends React.Component<IDraggableShape> {
	static centerPosition = [WIDTH / 2, HEIGHT / 2];
	static centerPositionAbstract = [(abstractTemplateStyle.width + abstractTemplateStyle.offset) / 2 + abstractTemplateStyle.offset,
		((abstractTemplateStyle.width + abstractTemplateStyle.offset) * abstractTemplateStyle.count) / 2 + abstractTemplateStyle.offset];
	
	public renderFilledTemplate() {
		return (
			<React.Fragment>
				<title>Fully Connected Layer</title>
				<rect id="svg_1" height={HEIGHT} width={WIDTH} y={OFFSET} x={OFFSET} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER} fill={BG}></rect>
			</React.Fragment>
		);
	}

	public renderAbstractTemplate() {
		const arr = new Array(abstractTemplateStyle.count).fill(0);

		return (
			<React.Fragment>
				<title>Fully Connected Layer</title>
				{
					arr.map((e, index) => {

						return Math.floor(arr.length / 2) != index &&
						<rect 
							key={index}
							rx={abstractTemplateStyle.width / 2}
							height={abstractTemplateStyle.width} 
							width={abstractTemplateStyle.width} 
							x={abstractTemplateStyle.offset} 
							y={abstractTemplateStyle.offset + (abstractTemplateStyle.width + abstractTemplateStyle.offset) * index} 
							strokeWidth="1" 
							stroke={this.props.isMarked ? abstractTemplateStyle.borderActive : abstractTemplateStyle.border} 
							fill={abstractTemplateStyle.bg}></rect>
					}
				)}
				<svg
					height={abstractTemplateStyle.width + (abstractTemplateStyle.width + abstractTemplateStyle.offset) * (arr.length+1)} 
					width={abstractTemplateStyle.width * 2}
				>
					<text
						x={abstractTemplateStyle.offset}
						y={abstractTemplateStyle.offset*2 + (abstractTemplateStyle.width + abstractTemplateStyle.offset) * Math.floor(arr.length / 2)}
					>
						<tspan x="25%" dy="0.5em">.</tspan>
						<tspan x="25%" dy="0.5em">.</tspan>
						<tspan x="25%" dy="0.5em">.</tspan>
					</text>

					<text
						x={abstractTemplateStyle.offset}
						y={abstractTemplateStyle.offset*2 + (abstractTemplateStyle.width + abstractTemplateStyle.offset) * arr.length}
						fontSize={8}
						alignmentBaseline="middle" 
						textAnchor="middle" 
					>
						<tspan x="30%" dy="1em">Fully</tspan>
						<tspan x="32%" dy="1.2em" >Connected</tspan>
						<tspan x="30%" dy="1.5em">32x32</tspan>
						<tspan x="30%" dy="1.5em">weights</tspan>
					</text>
				</svg>
			</React.Fragment>
		);
	}

	public render() {
		return this.renderAbstractTemplate();
	}
}
