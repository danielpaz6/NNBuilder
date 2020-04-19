import * as React from 'react';
import './diagram.scss';

import DraggableSVG from "./DraggableSVG";

import { editActiveShape, setShapes } from '../../store/shapes/actions';
import { updateMouseLocation } from '../../store/mouse/actions';
import { ShapeState } from '../../store/shapes/types';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import Arrows from './Arrows';
import { MouseState } from '../../store/mouse/types';
import { seedInitShapes } from '../../utils/seedShapes';

interface MouseLocation {
	nativeEvent: {
		offsetX: number;
		offsetY: number;
	};
}

export interface IDiagramContainerProps {
	shapes: ShapeState;
	mouse: MouseState;
	editActiveShape: typeof editActiveShape;
	updateMouseLocation: typeof updateMouseLocation;
	setShapes: typeof setShapes;
}

export interface IDiagramContainerState {
	//arrowX?: number;
	//arrowY?: number;
	isMouseInsideSVG: boolean;
}

class DiagramContainer extends React.PureComponent<IDiagramContainerProps, IDiagramContainerState> {
	//refElement = React.createRef<HTMLDivElement>();
	
	state = {
		isMouseInsideSVG: false
	};

	componentDidMount() {
		this.props.setShapes(seedInitShapes);
	}

	handleClick = (event : React.MouseEvent) => {
		// Checks if we clicked on the SVG element, but not any element inside.
		if (event.currentTarget === event.target) {
			// If that's the case, we'll remove the "active" from any shape
			this.props.editActiveShape(-1);
		}
	}

	handlePointerMovement = (e: React.MouseEvent | MouseLocation) => {
		if(this.props.shapes.sourceShape)
		{
			const x = e.nativeEvent.offsetX;
			const y = e.nativeEvent.offsetY;

			/*this.setState({
				arrowX: x,
				arrowY: y
			});*/

			this.props.updateMouseLocation(x, y);

		}
	}

	handleRightClick = (event: React.MouseEvent) => {
		// Disable active shape if needed
		this.handleClick(event);
		
		// Prevent default right click panel
		event.preventDefault();
	}

	handleKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
		// If we pressed Esc, we'll remove active shape
		if(event.keyCode === 27)
			this.props.editActiveShape(-1);
	}

	handleMouseLeave = () => {
		this.setState({
			isMouseInsideSVG: false
		});
	}

	handleMouseEnter = () => {
		this.setState({
			isMouseInsideSVG: true
		});
	}

	public render() {
		return (
			<div className="diagram-container">
				<svg width="100%" height="100%"
						onClick={this.handleClick}
						onMouseMove={this.handlePointerMovement}
						onContextMenu={this.handleRightClick}
						onKeyDown={this.handleKeyDown}
						onMouseLeave={this.handleMouseLeave}
						onMouseEnter={this.handleMouseEnter}
						role="button"
						tabIndex={0}
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
						this.props.shapes.sourceShape && this.state.isMouseInsideSVG ?
						<line
							onClick={this.handleClick}
							onContextMenu={this.handleRightClick}
							x1={this.props.shapes.sourceShape.x + this.props.shapes.sourceShape.centerPosition[0]}
							y1={this.props.shapes.sourceShape.y + this.props.shapes.sourceShape.centerPosition[1]}
							x2={this.props.mouse.xPointer}
							y2={this.props.mouse.yPointer}
							style={{stroke:"rgb(255,0,0)", strokeWidth:2}} />
						:
						null
					}

					<Arrows />
					
					{
						this.props.shapes.shapes.map(shape => 
							<DraggableSVG
								isMarked={this.props.shapes.sourceShape && shape.timestamp === this.props.shapes.sourceShape!.timestamp ? true : false}
								currentShape={shape}
								key={shape.timestamp}
							>
								{React.createElement(shape.shape, {
									isMarked: this.props.shapes.sourceShape && shape.timestamp === this.props.shapes.sourceShape!.timestamp ? true : false
								})}
							</DraggableSVG>
						)
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
	shapes: state.shapes,
	mouse: state.mouse
});

export default connect(
	mapStateToProps,
	{ editActiveShape, updateMouseLocation, setShapes }
)(DiagramContainer);