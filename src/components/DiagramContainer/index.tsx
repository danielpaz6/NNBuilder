import * as React from 'react';
import './diagram.scss';

import DraggableSVG from "./Shapes/DraggableSVG";
import { IDraggableShape } from "../../interfaces/shapes";

import Convolutional from "./Shapes/Convolutional";
import FullyConnected from "./Shapes/FullyConnected";
import Flatten from "./Shapes/Flatten";
import MaxPooling from "./Shapes/MaxPooling";
import Concatenate from "./Shapes/Concatenate";
import Addition from "./Shapes/Addition";

import { addShape } from '../../store/shapes/actions';
import { ShapeState } from '../../store/shapes/types';
import { connect } from 'react-redux';
import { AppState } from '../../store';

export interface IDiagramContainerProps {
	shapes: ShapeState
}

class DiagramContainer extends React.Component<IDiagramContainerProps> {
	public render() {
		return (
			<div className="diagram-container">
				<svg width="100%" height="100%">
					{/*<DraggableSVG render={(props : IDraggableShape) => (
						<Convolutional {...props} />
					)} />

					<DraggableSVG render={(props : IDraggableShape) => (
						<FullyConnected {...props} />
					)} />

					<DraggableSVG render={(props : IDraggableShape) => (
						<Flatten {...props} />
					)} />*/}

					{
						this.props.shapes.shapes.map(shape => 
							<DraggableSVG render={(props : IDraggableShape) => 
								React.createElement(shape.shape, {key: shape.timestamp, ...props}, null)}
							/>)
					}

					{/*<DraggableSVG render={(props : IDraggableShape) => (
						<MaxPooling {...props} />
					)} />

					<DraggableSVG render={(props : IDraggableShape) => (
						<Concatenate {...props} />
					)} />

					<DraggableSVG render={(props : IDraggableShape) => (
						<Addition {...props} />
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
	{ addShape }
)(DiagramContainer);