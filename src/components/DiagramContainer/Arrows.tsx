import * as React from 'react';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { ShapeState } from '../../store/shapes/types';
import { ConfigState } from '../../store/config/types';
import { Shape } from '../../interfaces/IShape';
import { TEMPLATE_FILLED } from '../../interfaces/designTemplates';
import FullyConnected, { abstractTemplateStyle } from './Shapes/FullyConnected';

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

	abstractArrow = (sourceShape: Shape, targetShape: Shape, x1: number, y1: number, x2: number, y2:number) => {

		const isActiveArrow = this.props.shapes.sourceArrow &&
			this.props.shapes.sourceArrow.source.timestamp === sourceShape.timestamp &&
			this.props.shapes.sourceArrow.target.timestamp === targetShape.timestamp;

		return (
			<polyline 
				key={sourceShape.timestamp + " " + targetShape.timestamp}
				markerEnd={"url(#"+(!isActiveArrow ? "bigArrow" : "bigArrowActive")+")"}
				points={`${x1},${y1} ${x2},${y2}`}
				fill="none"
				stroke={!isActiveArrow ? "#7788b0" : "red"}
				strokeWidth="4"
				onClick={() => this.props.handleArrowClick(sourceShape, targetShape)}
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

			let sX: number, sY: number, tX: number, tY: number;
			
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
						x1 + sourceShape.centerPosition[this.props.config.designTemplate][0],
						y1 + sourceShape.centerPosition[this.props.config.designTemplate][1],
						x2 + targetShape.centerPosition[this.props.config.designTemplate][0],
						y2 + targetShape.centerPosition[this.props.config.designTemplate][1]
					);
				}
				else {
					if(sourceShape.shape === FullyConnected && targetShape.shape === FullyConnected) {
						return this.fullyConnectedArrows(sourceShape, targetShape, x1, y1, x2, y2);
					}
					else {
						return this.abstractArrow(
							sourceShape,
							targetShape,
							x1 + sourceShape.centerPosition[this.props.config.designTemplate][0] * 2 + 5,
							y1 + sourceShape.centerPosition[this.props.config.designTemplate][1],
							x2 - 3,
							y2 + targetShape.centerPosition[this.props.config.designTemplate][1]
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