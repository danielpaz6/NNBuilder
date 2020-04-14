import * as React from 'react';
import './sidebar.scss';
//import Button from 'react-bootstrap/Button';
//import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { addShape } from '../../store/shapes/actions';
import { ShapeState } from '../../store/shapes/types';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import FullyConnected from '../DiagramContainer/Shapes/FullyConnected';

export interface ISideBarProps {
	addShape: typeof addShape;
	shapes: ShapeState;
}

class SideBar extends React.Component<ISideBarProps> {

	createShape = (id: number) => {
		if(id == 1) {
			/*this.props.addShape({
				name: "Fully Connected",
				timestamp: new Date().getTime()
			});*/
		}
	}

	public render() {
		console.log(this.props);
		return (
			<div className="side-bar">
				<Dropdown>
					<Dropdown.Toggle variant="success" id="dropdown-basic" style={{width: "100%"}}>
						Add new layer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</Dropdown.Toggle>

					<Dropdown.Menu style={{width: "100%"}}>
						<Dropdown.Header>Layers</Dropdown.Header>
						<Dropdown.Item onClick={this.createShape(1)}>Fully Connected</Dropdown.Item>
						<Dropdown.Item href="#/action-2">Convolutional</Dropdown.Item>
						<Dropdown.Item href="#/action-3">Max Pooling</Dropdown.Item>
						<Dropdown.Item href="#/action-3">Concatenate</Dropdown.Item>
						<Dropdown.Item href="#/action-3">Flattern</Dropdown.Item>
						<Dropdown.Item href="#/action-3">Add</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Header>Activation</Dropdown.Header>
						<Dropdown.Item href="#/action-1">ReLU</Dropdown.Item>
						<Dropdown.Item href="#/action-2">Sigmoid</Dropdown.Item>
						<Dropdown.Item href="#/action-3">Tanh</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<br />
				
				<h6 style={{paddingLeft: "5px"}}>Layers</h6>
				<ListGroup defaultActiveKey="#link1">
					<ListGroup.Item action href="#link1">
						Convolutional
					</ListGroup.Item>
					<ListGroup.Item action href="#link2">
						Max Pooling (1)
					</ListGroup.Item>
					<ListGroup.Item action href="#link3">
						Max Pooling (2)
					</ListGroup.Item>
					<ListGroup.Item action href="#link4">
						Fully Connected
					</ListGroup.Item>
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
	{ addShape }
)(SideBar);