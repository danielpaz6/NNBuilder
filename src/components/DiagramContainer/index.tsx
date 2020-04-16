import * as React from 'react';
import './diagram.scss';

import DraggableSVG from "./Shapes/DraggableSVG";
import { IDraggableShape } from "../../interfaces/shapes";

import { editActiveShape } from '../../store/shapes/actions';
import { ShapeState } from '../../store/shapes/types';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import Arrows from './Arrows';

export interface IDiagramContainerProps {
	shapes: ShapeState,
	editActiveShape: typeof editActiveShape
}

export interface IDiagramContainerState {
	arrowX?: number;
	arrowY?: number;
}

class DiagramContainer extends React.Component<IDiagramContainerProps, IDiagramContainerState> {

	refElement = React.createRef<HTMLDivElement>();

	handleClick = (event : React.MouseEvent) => {

		// Checks if we clicked on the SVG element, but not any element inside.
		if (event.currentTarget === event.target) {
			// If that's the case, we'll remove the "active" from any shape
			this.props.editActiveShape(-1);
		}
	}

	handlePointerMovement = (e: React.MouseEvent) => {
		if(this.props.shapes.sourceShape)
		{
			//const el = e.target as HTMLInputElement;
			//const bbox = el.getBoundingClientRect();

			const x = e.clientX - 212;
			const y = e.clientY - 38;

			this.setState({
				arrowX: x,
				arrowY: y
			});

			console.log(e)
		}
	}

	public render() {
		const lock = this.state && this.state.arrowX ? true : false;

		return (
			<div className="diagram-container">
				<svg width="100%" height="100%"
						onClick={this.handleClick}
						onMouseMove={this.handlePointerMovement}
					>
					<defs>	
						<marker orient='auto' id="arrow" refX="0" refY="7"
							markerWidth="80" markerHeight="80">
							<polygon
									points="2,7 0,0 11,7 0,14"
									stroke="red"
									fill="red" 
								/>
						</marker>
					</defs>	
					{
						this.props.shapes.sourceShape && lock ?
						<line
							onClick={this.handleClick}
							x1={this.props.shapes.sourceShape.x + this.props.shapes.sourceShape.centerPosition[0]}
							y1={this.props.shapes.sourceShape.y + this.props.shapes.sourceShape.centerPosition[1]}
							x2={this.state.arrowX}
							y2={this.state.arrowY}
							style={{stroke:"rgb(255,0,0)",strokeWidth:2}} />
						:
						null
					}

					<Arrows />
					
					{
						this.props.shapes.shapes.map(shape => 
							<DraggableSVG
								id={shape.timestamp}
								key={shape.timestamp}
								render={(props : IDraggableShape) => 
									React.createElement(shape.shape, {...props}, null)}
							/>)
					}

					{/*<DraggableSVG render={(props : IDraggableShape) => (
						<MaxPooling {...props} />
					)} />*/}
				</svg>
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	shapes: state.shapes
});

export default connect(
	mapStateToProps,
	{ editActiveShape }
)(DiagramContainer);