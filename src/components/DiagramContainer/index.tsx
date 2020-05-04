import * as React from 'react';
import './diagram.scss';

import DraggableSVG from "./DraggableSVG";

import { editActiveShape, setShapes, editActiveArrow } from '../../store/shapes/actions';
import { updateMouseLocation } from '../../store/mouse/actions';
import { ShapeState } from '../../store/shapes/types';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import Arrows from './Arrows';
import { MouseState } from '../../store/mouse/types';
import { seedInitShapes } from '../../utils/seedShapes';
import { ConfigState } from '../../store/config/types';
import { Shape } from '../../interfaces/IShape';
import Defs from './Defs';

interface MouseLocation {
	nativeEvent: {
		offsetX: number;
		offsetY: number;
	};
}

export interface IDiagramContainerProps {
	shapes: ShapeState;
	mouse: MouseState;
	config: ConfigState;
	editActiveShape: typeof editActiveShape;
	updateMouseLocation: typeof updateMouseLocation;
	setShapes: typeof setShapes;
	editActiveArrow: typeof editActiveArrow;
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

	handleArrowClick = (source: Shape, target: Shape) => {
		// We'll remove the active shape ( it also remove the active arrow )
		this.props.editActiveShape(-1);

		// We'll reassign to the new Arrow
		this.props.editActiveArrow(source, target);
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

		// Edge case: when you click on close button of a Toast
		// the this.state.isMouseInsideSVG will be set as false
		// hence, if we moving the mouse inside the SVG again, we'll set it as true
		// it is pure component so no need to check if it's false
		// and anyway it will be re-rendered since we move the red line.
		
		this.setState({isMouseInsideSVG: true});
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
					<Defs />
					{
						this.props.shapes.sourceShape && this.state.isMouseInsideSVG ?
						<line
							onClick={this.handleClick}
							onContextMenu={this.handleRightClick}
							x1={this.props.shapes.sourceShape.x + this.props.shapes.sourceShape.centerPosition[this.props.config.designTemplate][0]}
							y1={this.props.shapes.sourceShape.y + this.props.shapes.sourceShape.centerPosition[this.props.config.designTemplate][1]}
							x2={this.props.mouse.xPointer}
							y2={this.props.mouse.yPointer}
							style={{stroke:"rgb(255,0,0)", strokeWidth:2}} />
						:
						null
					}

					<Arrows handleArrowClick={this.handleArrowClick} />

					{
						this.props.shapes.shapes.map(shape => 
							<DraggableSVG
								isMarked={this.props.shapes.sourceShape && shape.timestamp === this.props.shapes.sourceShape!.timestamp ? true : false}
								currentShape={shape}
								key={shape.timestamp}
							>
								{React.createElement(shape.shape, {
									isMarked: this.props.shapes.sourceShape && shape.timestamp === this.props.shapes.sourceShape!.timestamp ? true : false,
									additionalInfo: shape.additionalInfo,
									templateDesign: this.props.config.designTemplate
								})}
							</DraggableSVG>
						)
					}
				</svg>
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	shapes: state.shapes,
	mouse: state.mouse,
	config: state.config
});

export default connect(
	mapStateToProps,
	{ editActiveShape, updateMouseLocation, setShapes, editActiveArrow }
)(DiagramContainer);