import * as React from 'react';
import './diagram.scss';

import DraggableSVG from "./Shapes/DraggableSVG";
import { IDraggableShape } from "../../interfaces/shapes";

import { editActiveShape } from '../../store/shapes/actions';
import { ShapeState } from '../../store/shapes/types';
import { connect } from 'react-redux';
import { AppState } from '../../store';

export interface IDiagramContainerProps {
	shapes: ShapeState,
	editActiveShape: typeof editActiveShape
}

class DiagramContainer extends React.Component<IDiagramContainerProps> {

	refElement = React.createRef<HTMLDivElement>();

	handleClick = (event : React.MouseEvent) => {

		// Checks if we clicked on the SVG element, but not any element inside.
		if (event.currentTarget === event.target) {
			// If that's the case, we'll remove the "active" from any shape

			this.props.editActiveShape(-1, false);
		}
	}

	public render() {
		return (
			<div className="diagram-container">
				<svg width="100%" height="100%" onClick={this.handleClick}>
					{
						this.props.shapes.shapes.map(shape => 
							<DraggableSVG
								id={shape.timestamp}
								key={shape.timestamp}
								active={shape.active}
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