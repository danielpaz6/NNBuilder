import * as React from 'react';
import { IDraggableShape } from "../../../interfaces/shapes";


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

export default class Convolutional extends React.Component<IDraggableShape> {

	// I'll leave it 4/2 since this "4" should be variable in the future, it's
	// the number of boxes we display
	static centerPosition = [WIDTH / 2 + (PADDING) * 4 / 2, HEIGHT / 2 + (PADDING) * 4 / 2];

	public render() {
		//console.log("Rect State", this.props);
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
}
