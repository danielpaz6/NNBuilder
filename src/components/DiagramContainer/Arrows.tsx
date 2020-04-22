import * as React from 'react';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { ShapeState } from '../../store/shapes/types';

export interface IArrowsProps {
	shapes: ShapeState;
}

export interface IArrowsState {
}

class Arrows extends React.Component<IArrowsProps, IArrowsState> {
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
			this.props.shapes.arrows.getList().map((entry : any) => {
				// [[Shape, Shape], AllActivationFunctions]
				const [[sourceShape, targetShape], activationFunction] = entry;

				const x1 = sourceShape.x + sourceShape.centerPosition[0];
				const x2 = targetShape.x + targetShape.centerPosition[0];

				const y1 = sourceShape.y + sourceShape.centerPosition[1];
				const y2 = targetShape.y + targetShape.centerPosition[1];

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
				
			})
			}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	shapes: state.shapes
});

export default connect(
	mapStateToProps
)(Arrows);