import * as React from 'react';
import './sidebar.scss';
//import Button from 'react-bootstrap/Button';
//import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { addShape, editActiveShape } from '../../store/shapes/actions';
import { ShapeState, Shape } from '../../store/shapes/types';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { layersMap } from '../../interfaces/shapes';

export interface ISideBarProps {
	addShape: typeof addShape;
	editActiveShape: typeof editActiveShape;
	shapes: ShapeState;
}

class SideBar extends React.Component<ISideBarProps>
{
	createShape = (shapeName: string) => {
		const layer = layersMap[shapeName];

		const newObject : Shape = {
			name: shapeName,
			timestamp: new Date().getTime(),
			shape: layer.create(),
			x: 0,
			y: 0,
			centerPosition: layer.centerPosition,
			connectedTo: [],
			connectedToMe: []
		};

		this.props.addShape(newObject);
	}

	toggleActive = (timestamp: number) => {
		this.props.editActiveShape(
			timestamp
		)
	}

	public render() {
		console.log(this.props);

		const targetTimeStamp = this.props.shapes.sourceShape ? this.props.shapes.sourceShape.timestamp : -1;

		return (
			<div className="side-bar">
				<Dropdown>
					<Dropdown.Toggle variant="success" id="dropdown-basic" style={{width: "100%"}}>
						Add new layer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</Dropdown.Toggle>

					<Dropdown.Menu style={{width: "100%"}}>
						<Dropdown.Header>Layers</Dropdown.Header>
						<Dropdown.Item onClick={() => this.createShape("FullyConnected")}>Fully Connected</Dropdown.Item>
						<Dropdown.Item onClick={() => this.createShape("Convolutional")}>Convolutional</Dropdown.Item>
						<Dropdown.Item onClick={() => this.createShape("MaxPooling")}>Max Pooling</Dropdown.Item>
						<Dropdown.Item onClick={() => this.createShape("Concatenate")}>Concatenate</Dropdown.Item>
						<Dropdown.Item onClick={() => this.createShape("Flatten")}>Flatten</Dropdown.Item>
						<Dropdown.Item onClick={() => this.createShape("Addition")}>Add</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Header>Activation</Dropdown.Header>
						<Dropdown.Item>ReLU</Dropdown.Item>
						<Dropdown.Item>Sigmoid</Dropdown.Item>
						<Dropdown.Item>Tanh</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<br />
				
				<h6 style={{paddingLeft: "5px"}}>Layers</h6>
				<ListGroup defaultActiveKey="#link1">
					{
						this.props.shapes.shapes.map(shape => 
							<ListGroup.Item
								action
								key={shape.timestamp}
								active={shape.timestamp === targetTimeStamp ? true : false}
								onClick={() => this.toggleActive(shape.timestamp)}
							>
								{shape.name}
							</ListGroup.Item>
						)
					}
				</ListGroup>
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	shapes: state.shapes
});

export default connect(
	mapStateToProps,
	{ addShape, editActiveShape }
)(SideBar);