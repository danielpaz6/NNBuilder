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
	constructor(props: IArrowsProps) {
		super(props);

		this.state = {

		}
	}

	
	public render() {
		return (
			this.props.shapes.shapes.map(sourceShape => sourceShape.connectedTo.map(targetShape =>
				<line
					key={sourceShape.timestamp + "" + targetShape.timestamp}
					x1={sourceShape.x + sourceShape.centerPosition[0]}
					y1={sourceShape.y + sourceShape.centerPosition[1]}
					x2={targetShape.x + targetShape.centerPosition[0]}
					y2={targetShape.y + targetShape.centerPosition[1]}
					style={{stroke:"rgb(255,0,0)", strokeWidth:2}} />
			))
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	shapes: state.shapes
});

export default connect(
	mapStateToProps
)(Arrows);