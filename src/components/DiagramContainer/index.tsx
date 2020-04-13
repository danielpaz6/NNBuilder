import * as React from 'react';
import './diagram.scss';

import DraggableSVG from "./Shapes/DraggableSVG";
import { IDraggableShape } from "./Shapes/shape";

import Convolutional from "./Shapes/Convolutional";
import FullyConnected from "./Shapes/FullyConnected";
import Flatten from "./Shapes/Flatten";
import MaxPooling from "./Shapes/MaxPooling";
import Concatenate from "./Shapes/Concatenate";
import Addition from "./Shapes/Addition";

export interface IDiagramContainerProps {
}

export default class DiagramContainer extends React.Component<IDiagramContainerProps> {
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

					<DraggableSVG render={(props : IDraggableShape) => (
						<MaxPooling {...props} />
					)} />

					<DraggableSVG render={(props : IDraggableShape) => (
						<Concatenate {...props} />
					)} />

					<DraggableSVG render={(props : IDraggableShape) => (
						<Addition {...props} />
					)} />
				</svg>
			</div>
		);
	}
}