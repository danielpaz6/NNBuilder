import * as React from 'react';
import './diagram.scss';

import DraggableSVG from "./DraggableSVG";

import { editActiveShape, setShapes, editActiveArrow, deleteShape, deleteArrow, updateShapePositionAction } from '../../store/shapes/actions';
import { updateSVGRef } from "../../store/config/actions";
import { addToast } from "../../store/toasts/actions";
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
import Input from './Shapes/Input';
import Output from './Shapes/Output';

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
	deleteShape: typeof deleteShape;
	deleteArrow: typeof deleteArrow;
	updateShapePositionAction: typeof updateShapePositionAction;
	addToast: typeof addToast;
	updateSVGRef: typeof updateSVGRef;
}

export interface IDiagramContainerState {
	//arrowX?: number;
	//arrowY?: number;
	isMouseInsideSVG: boolean;
}

class DiagramContainer extends React.PureComponent<IDiagramContainerProps, IDiagramContainerState> {
	refElement = React.createRef<SVGSVGElement>();
	
	state = {
		isMouseInsideSVG: false
	};

	componentDidMount() {
		this.props.setShapes(seedInitShapes);
		this.props.updateSVGRef(this.refElement.current!);
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
		// If someone pressed Esc, we'll remove active shape ( also removes the active arrow )
		if(event.keyCode === 27) {
			this.props.editActiveShape(-1);
		}
		else if(this.props.shapes.sourceShape && [65,87,68,83,37,38,39,40].includes(event.keyCode)) {
			const xPos = this.props.shapes.sourceShape.x;
			const yPos = this.props.shapes.sourceShape.y;
			const timestamp = this.props.shapes.sourceShape.timestamp;
			
			// Key: W or Up
			if(event.keyCode === 87 || event.keyCode === 38) {
				this.props.updateShapePositionAction(
					timestamp,
					xPos,
					yPos - 5
				);
			}

			// Key: S or Down
			else if(event.keyCode === 83 || event.keyCode === 40) {
				this.props.updateShapePositionAction(
					timestamp,
					xPos,
					yPos + 5
				);
			}

			// Key: A or Left
			else if(event.keyCode === 65 || event.keyCode === 37) {
				this.props.updateShapePositionAction(
					timestamp,
					xPos - 5,
					yPos
				);
			}

			// Key: D or Right
			else if(event.keyCode === 68 || event.keyCode === 39) {
				this.props.updateShapePositionAction(
					timestamp,
					xPos + 5,
					yPos
				);
			}

		}
		// If someone preseed Delete, we'll remove the current arrow/shape.
		else if(event.keyCode === 46 || event.keyCode === 8) {
			if(this.props.shapes.sourceShape) {

				// Edge case: cannot remove Input/Output layers
				if(this.props.shapes.sourceShape!.shape !== Input &&
					this.props.shapes.sourceShape!.shape !== Output) {
					this.props.deleteShape();
				}
				else {
					this.props.addToast("Removal Error", `You cannot remove Input / Output layers.`)
				}

				this.props.editActiveShape(-1);

			}
			else if(this.props.shapes.sourceArrow) {
				this.props.deleteArrow();
				this.props.editActiveShape(-1);
			}

			// Note: the reason that we made "duplicate code" by using
			// `this.props.editActiveShape(-1);` twice is because we don't want
			// to active this function every time that someone pressed on delete button.
		}
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
					ref={this.refElement}
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
	{ 
		editActiveShape, 
		updateMouseLocation, 
		updateShapePositionAction,
		setShapes, 
		editActiveArrow, 
		deleteShape, 
		deleteArrow, 
		addToast, 
		updateSVGRef 
	},
	
)(DiagramContainer);