import * as React from 'react';
import { IDraggableShape } from "../../../interfaces/shapes";
import { TEMPLATE_ABSTRACT } from '../../../interfaces/designTemplates';


// Positioning
const WIDTH = 30;
const HEIGHT = 30;
const PADDING = 5;
const OFFSET = 2;

// Styling Component
const BG1 = "#edffea";
const BG2 = "#75daad";
const BORDER1 = "#75daad";
const BORDER2 = "#75daad";
const BORDER_ACTIVE = "orange";

const filledTemplateStyle = {
	width: 40,
	height: 40,
	offset: 2,
	bg1: "#edffea",
	bg2: "#75daad",
	border1: "#75daad",
	border2: "#75daad",
	borderActive: "red"
}

const abstractTemplateStyle = {
	width: 120,
	height: 100,
	offset: 2,
	bg: "#dae7fc",
	border: "#909da6",
	borderActive: "red",
	count: 5,
	padding: 8
}

export default class Convolutional extends React.Component<IDraggableShape> {

	// I'll leave it 4/2 since this "4" should be variable in the future, it's
	// the number of boxes we display
	static centerPosition = [WIDTH / 2 + (PADDING) * 4 / 2, HEIGHT / 2 + (PADDING) * 4 / 2];

	static centerPositionAbstract = [(abstractTemplateStyle.width + abstractTemplateStyle.padding*abstractTemplateStyle.count) / 2,
		(abstractTemplateStyle.height + abstractTemplateStyle.padding*abstractTemplateStyle.count) / 2];

	public renderFilledTemplate() {
		return (
			<React.Fragment>
				<title>Convolutional Layer</title>
				
				<rect id="svg_1" height={HEIGHT} width={WIDTH} y={OFFSET} x={OFFSET + PADDING} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER1} fill={BG1}></rect>
				<rect id="svg_2" height={HEIGHT} width={WIDTH} y={OFFSET + PADDING} x={OFFSET + PADDING*2} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER2} fill={BG2}></rect>
				<rect id="svg_3" height={HEIGHT} width={WIDTH} y={OFFSET + PADDING*2} x={OFFSET + PADDING*3} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER1} fill={BG1}></rect>
				<rect id="svg_4" height={HEIGHT} width={WIDTH} y={OFFSET + PADDING*3} x={OFFSET + PADDING*4} strokeWidth="1" stroke={this.props.isMarked ? BORDER_ACTIVE : BORDER2} fill={BG2}></rect>
			</React.Fragment>
		);
	}

	public renderAbstractTemplate() {
		const arr = new Array(abstractTemplateStyle.count).fill(0);

		return (
			<React.Fragment>
				<title>Convolutional Layer</title>
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
				<polyline 
					markerEnd="url(#smallArrow)"
					points={`${abstractTemplateStyle.padding*(arr.length-1) + abstractTemplateStyle.offset},${abstractTemplateStyle.offset + abstractTemplateStyle.padding*(arr.length-1) + 30} ${4},${20}`}
					fill="none"
					stroke={abstractTemplateStyle.border}
				/>
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
							<tspan x="50%" dy="1.2em">Convolutional</tspan>
    						<tspan x="50%" dy="1.2em">Layer</tspan>
							{
								this.props.additionalInfo &&
								<React.Fragment>
									<tspan x="50%" dy="1.8em" fontSize="10px">{this.props.additionalInfo.kernelSize}x{this.props.additionalInfo.kernelSize}</tspan>
									<tspan x="50%" dy="1.8em" fontSize="10px">(stride {this.props.additionalInfo.stride})</tspan>
								</React.Fragment>
							}
					</text>
				</svg>

				<svg 
					width={50}
					height={200} 
					x={-7}
					y={abstractTemplateStyle.padding*(arr.length/2) - 15}
					>
					<text 
						x="30%" 
						y="20%" 
						alignmentBaseline="middle" 
						textAnchor="middle" 
						fontSize="10px">
							{
							this.props.additionalInfo &&
							<React.Fragment>
								<tspan x="50%" dy="1.2em" fontWeight="bold">{this.props.additionalInfo.outChannels}</tspan>
								<tspan x="50%" dy="1.2em" fontSize="8px">Channels</tspan>
							</React.Fragment>
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
