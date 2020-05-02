import * as React from 'react';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { ShapeState } from '../../store/shapes/types';
import { ConfigState } from '../../store/config/types';
import { Shape } from '../../interfaces/IShape';
import { TEMPLATE_FILLED } from '../../interfaces/designTemplates';
import Input from './Shapes/Input';
import FullyConnected, { abstractTemplateStyle } from './Shapes/FullyConnected';

export interface IArrowsProps {
	shapes: ShapeState;
	config: ConfigState;
}

export interface IArrowsState {
}

class Arrows extends React.Component<IArrowsProps, IArrowsState> {

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

	abstractArrow = (sourceShape: Shape, targetShape: Shape, x1: number, y1: number, x2: number, y2:number) => {

		const xMid = (x1 + x2) / 2;
		const yMid = (y1 + y2) / 2;

		return (
			<polyline 
				key={sourceShape.timestamp + " " + targetShape.timestamp}
				markerEnd="url(#bigArrow)"
				points={`${x1},${y1} ${x2},${y2}`}
				fill="none"
				stroke="#7788b0"
				strokeWidth="4"
			/>
		);
	}

	fullyConnectedArrows = (sourceShape: Shape, targetShape: Shape, x1: number, y1: number, x2: number, y2:number) => {
		const arr1 = new Array(sourceShape.additionalInfo!.nodesCount).fill(0);
		const arr2 = new Array(targetShape.additionalInfo!.nodesCount).fill(0);

		const midArr1 = Math.abs((arr1.length-1) / 2);
		const midArr2 = Math.abs((arr2.length-1) / 2);

		return arr1.map((_,i) => arr2.map((_, j) => {
			if(i === midArr1 || j === midArr2)
				return null;
			
			console.log("x1", x1, sourceShape.x);
			const sX = x1 + abstractTemplateStyle.offset + abstractTemplateStyle.width;
			const sY = y1 + abstractTemplateStyle.offset + abstractTemplateStyle.width/2 + (abstractTemplateStyle.width + abstractTemplateStyle.offset) * (i);

			const tX = x2 - 3;
			const tY = y2 + abstractTemplateStyle.offset + abstractTemplateStyle.width/2 + (abstractTemplateStyle.width + abstractTemplateStyle.offset) * (j);

			return (
				<polyline 
					key={sourceShape.timestamp + " " + targetShape.timestamp + " " + i + " " + j}
					markerEnd="url(#smallArrow)"
					points={`${sX},${sY} ${tX},${tY}`}
					fill="none"
					stroke="rgba(0,0,0,.2)"
				/>
			);
		}));
	}

	public render() {
		/*console.log("Regular", this.props.shapes.arrows);
		console.log("Test", Array.from(this.props.shapes.arrows.entries()));
		console.log("Object.entries", Object.entries(this.props.shapes.arrows));
		console.log("Object.keys", Object.keys(this.props.shapes.arrows));
		console.log("-----------------------");*/
		return (
			<React.Fragment>
			{
			//Array.from(this.props.shapes.arrows.entries()).map((entry) => {
			this.props.shapes.arrows.getList().map((entry) => {
				// [[Shape, Shape], AllActivationFunctions]
				const [sourceShape, targetShape, /*activationFunction*/] = entry;
				
				const x1 = sourceShape.x;
				const x2 = targetShape.x;

				const y1 = sourceShape.y;
				const y2 = targetShape.y;

				if(this.props.config.designTemplate === TEMPLATE_FILLED) {
					return this.filledArrow(
						sourceShape,
						targetShape,
						x1 + sourceShape.centerPosition[0],
						y1 + sourceShape.centerPosition[1],
						x2 + targetShape.centerPosition[0],
						y2 + targetShape.centerPosition[1]
					);
				}
				else {
					if(sourceShape.shape === FullyConnected && targetShape.shape === FullyConnected) {
						console.log("HERE!");
						return this.fullyConnectedArrows(sourceShape, targetShape, x1, y1, x2, y2);
					}
					else {
						return this.abstractArrow(
							sourceShape,
							targetShape,
							x1 + sourceShape.centerPosition[0] * 2 + 5,
							y1 + sourceShape.centerPosition[1],
							x2 - 3,
							y2 + targetShape.centerPosition[1]
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