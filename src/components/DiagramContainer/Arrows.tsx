import * as React from 'react';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { ShapeState } from '../../store/shapes/types';
import { ConfigState } from '../../store/config/types';
import { Shape } from '../../interfaces/IShape';
import { TEMPLATE_FILLED } from '../../interfaces/designTemplates';
import FullyConnected, { abstractTemplateStyle } from './Shapes/FullyConnected';
import { AllActivationFunctions, ACTIVATION_NONE } from '../../interfaces/activations';
import { fixedDistanceFromPolygon } from '../../utils/distance';

export interface IArrowsProps {
	shapes: ShapeState;
	config: ConfigState;
	handleArrowClick: (source: Shape, target: Shape) => void
}
class Arrows extends React.Component<IArrowsProps> {

	filledArrow = (sourceShape: Shape, targetShape: Shape, x1: number, y1: number, x2: number, y2:number) => {

		const xMid = (x1 + x2) / 2;
		const yMid = (y1 + y2) / 2;

		return (
			<polyline 
				key={sourceShape.timestamp + " " + targetShape.timestamp}
				markerMid="url(#arrow)"
				points={`${x1},${y1} ${xMid},${yMid} ${x2},${y2}`}
				fill="none"
				stroke="black"
			/>
		);
	}

	abstractArrow = (sourceShape: Shape, targetShape: Shape, x1: number, y1: number, x2: number, y2: number, activationFunction: AllActivationFunctions) => {

		const isActiveArrow = this.props.shapes.sourceArrow &&
			this.props.shapes.sourceArrow.source.timestamp === sourceShape.timestamp &&
			this.props.shapes.sourceArrow.target.timestamp === targetShape.timestamp;

		
		const xMid = (x1 + x2) / 2;
		const yMid = (y1 + y2) / 2;

		let xText, yText;
		if(activationFunction !== ACTIVATION_NONE) {
			const d = 12 + activationFunction.length * 2;

			[xText, yText] = fixedDistanceFromPolygon(d, xMid, yMid, x2, y2);
		}

		return (
			<React.Fragment>
				<polyline 
					key={sourceShape.timestamp + " " + targetShape.timestamp}
					markerEnd={"url(#"+(!isActiveArrow ? "bigArrow" : "bigArrowActive")+")"}
					points={`${x1},${y1} ${x2},${y2}`}
					fill="none"
					stroke={!isActiveArrow ? "#7788b0" : "red"}
					strokeWidth="4"
					onClick={() => this.props.handleArrowClick(sourceShape, targetShape)}
				/>
				{activationFunction !== ACTIVATION_NONE && <text
					x={xText}
					y={yText}
					alignmentBaseline="middle" 
					textAnchor="middle" 
					fontSize="12px"
					fontWeight="bold"
				>{activationFunction}</text>}
			</React.Fragment>
		);
	}

	fullyConnectedArrows = (sourceShape: Shape, targetShape: Shape, x1: number, y1: number, x2: number, y2:number, activationFunction: AllActivationFunctions) => {
		const arr1 = new Array(sourceShape.additionalInfo!.nodesCount).fill(0);
		const arr2 = new Array(targetShape.additionalInfo!.nodesCount).fill(0);

		const midArr1 = Math.abs((arr1.length-1) / 2);
		const midArr2 = Math.abs((arr2.length-1) / 2);

		const polyPoints: number[][] = [];

		const isActiveArrow = this.props.shapes.sourceArrow &&
			this.props.shapes.sourceArrow.source.timestamp === sourceShape.timestamp &&
			this.props.shapes.sourceArrow.target.timestamp === targetShape.timestamp;

		
		let xText:number = 0, yText:number = 0;

		//const x3 = x2 + 
		return (
		<React.Fragment>
		{
			arr1.map((_,i) => arr2.map((_, j) => {
				if(i === midArr1 || j === midArr2)
					return null;

				let sX: number, sY: number, tX: number, tY: number;
				
				// The Source FC is in the left side of the Target FC
				if(x1 < x2) {
					sX = x1 + abstractTemplateStyle.offset + abstractTemplateStyle.width;
					sY = y1 + abstractTemplateStyle.offset + abstractTemplateStyle.width/2 + (abstractTemplateStyle.width + abstractTemplateStyle.offset) * (i);

					tX = x2 - 3;
					tY = y2 + abstractTemplateStyle.offset + abstractTemplateStyle.width/2 + (abstractTemplateStyle.width + abstractTemplateStyle.offset) * (j);
				}
				else {
					sX = x1 + 1;
					sY = y1 + abstractTemplateStyle.offset + abstractTemplateStyle.width/2 + (abstractTemplateStyle.width + abstractTemplateStyle.offset) * (i);

					tX = x2 + abstractTemplateStyle.offset + abstractTemplateStyle.width + 3;
					tY = y2 + abstractTemplateStyle.offset + abstractTemplateStyle.width/2 + (abstractTemplateStyle.width + abstractTemplateStyle.offset) * (j);
				}

				// If it's the last iteration or last iteration:
				// We'll add that points to polyPoints,
				// So we could make a structure from it later on.

				if(i === 0 && j === 0) {
					polyPoints.push([sX, sY], [tX, tY]);
				}
				else if(i === arr1.length-1 && j === arr2.length-1) {
					polyPoints.push([tX, tY], [sX, sY]);

					if(activationFunction !== ACTIVATION_NONE) {
						const xMid = (tX + sX) / 2;
						const yMid = (tY + sY) / 2;

						const d = 12 + activationFunction.length * 2;
						[xText, yText] = fixedDistanceFromPolygon(d, xMid, yMid, sX, sY);
					}
				}

				return (
						<polyline 
							key={sourceShape.timestamp + " " + targetShape.timestamp + " " + i + " " + j}
							markerEnd="url(#smallArrow)"
							points={`${sX},${sY} ${tX},${tY}`}
							fill="none"
							stroke={!isActiveArrow ? "rgba(0,0,0,.2)" : "red"}
						/>
				);
			}))
		}
		<polyline 
			points={polyPoints.map(p => p.join(',')).join(' ')}
			fill="transparent"
			stroke="none"
			onClick={() => this.props.handleArrowClick(sourceShape, targetShape)}
		/>
		{activationFunction !== ACTIVATION_NONE && <text
			x={xText}
			y={yText}
			alignmentBaseline="middle" 
			textAnchor="middle" 
			fontSize="12px"
			fontWeight="bold"
			>{activationFunction}</text>}
		</React.Fragment>);
	}

	public render() {
		return (
			<React.Fragment>
			{
			//Array.from(this.props.shapes.arrows.entries()).map((entry) => {
			this.props.shapes.arrows.getList().map((entry) => {
				const [sourceShape, targetShape, activationFunction] = entry;
				
				const x1 = sourceShape.x;
				const x2 = targetShape.x;

				const y1 = sourceShape.y;
				const y2 = targetShape.y;

				if(this.props.config.designTemplate === TEMPLATE_FILLED) {
					return this.filledArrow(
						sourceShape,
						targetShape,
						x1 + sourceShape.centerPosition[this.props.config.designTemplate][0],
						y1 + sourceShape.centerPosition[this.props.config.designTemplate][1],
						x2 + targetShape.centerPosition[this.props.config.designTemplate][0],
						y2 + targetShape.centerPosition[this.props.config.designTemplate][1]
					);
				}
				else {
					if(sourceShape.shape === FullyConnected && targetShape.shape === FullyConnected) {
						return this.fullyConnectedArrows(sourceShape, targetShape, x1, y1, x2, y2, activationFunction);
					}
					else {
						return this.abstractArrow(
							sourceShape,
							targetShape,
							x1 + sourceShape.centerPosition[this.props.config.designTemplate][0],
							y1 + sourceShape.centerPosition[this.props.config.designTemplate][1],
							x2 - 3,
							y2 + targetShape.centerPosition[this.props.config.designTemplate][1],
							activationFunction
						);
					}
				}
				
			})
			}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	shapes: state.shapes,
	config: state.config
});

export default connect(
	mapStateToProps
)(Arrows);