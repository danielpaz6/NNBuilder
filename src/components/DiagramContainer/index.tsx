import * as React from 'react';
import './diagram.scss';

import Rect from "./Shapes/Rect";

export interface IDiagramContainerProps {
}

export default class DiagramContainer extends React.Component<IDiagramContainerProps> {
	public render() {
		return (
			<div className="diagram-container">
				<svg width="100%" height="100%">
					<Rect id="1" />
					<Rect id="2" />
				</svg>
			</div>
		);
	}
}