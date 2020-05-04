import * as React from 'react';
import './sidebar.scss';
import Button from 'react-bootstrap/Button';
//import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { addShape, editActiveShape } from '../../store/shapes/actions';
import { updateMouseLocation } from '../../store/mouse/actions';
import { ShapeState } from '../../store/shapes/types';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { layersMap } from '../../interfaces/shapes';
import TemplatesModal from '../TemplatesModal';
import CodeGeneratorPanel from '../CodeGeneratorPanel';
import { addToast } from '../../store/toasts/actions';
import { Shape } from '../../interfaces/IShape';
import { ConfigState } from '../../store/config/types';

export interface ISideBarProps {
	addShape: typeof addShape;
	editActiveShape: typeof editActiveShape;
	updateMouseLocation: typeof updateMouseLocation;
	addToast: typeof addToast;
	shapes: ShapeState;
	config: ConfigState;
}

export interface ISideBarState {
	modalShow: boolean;
	codeModalShow: boolean;
}

class SideBar extends React.Component<ISideBarProps, ISideBarState>
{
	state = {
		modalShow: false,
		codeModalShow: false
	};

	handleSetModal = (pred: boolean) => {
		this.setState({
			modalShow: pred
		});
	};

	handleSetCodeModal = (pred: boolean) => {
		this.setState({
			codeModalShow: pred
		});
	}

	createShape = (shapeName: string) => {
		const layer = layersMap[shapeName];

		const newObject : Shape = {
			name: shapeName,
			timestamp: new Date().getTime(),
			shape: layer.create(),
			x: 100 + Math.random() * 100,
			y: 100 + Math.random() * 100,
			centerPosition: layer.centerPosition,
			
			// Deep copy, otherwise they all will point to the same additionalInfo object
			additionalInfo: {...layer.additionalInfo}
		};

		console.log(newObject);

		this.props.addShape(newObject);
	}

	toggleActive = (timestamp: number) => {
		this.props.editActiveShape(
			timestamp
		)

		const getActiveShape = this.props.shapes.shapes.find(s => s.timestamp === timestamp)!;

		this.props.updateMouseLocation(
			getActiveShape.x + getActiveShape.centerPosition[this.props.config.designTemplate][0],
			getActiveShape.y + getActiveShape.centerPosition[this.props.config.designTemplate][1]
		);
	}
	
	public render() {
		const targetTimeStamp = this.props.shapes.sourceShape ? this.props.shapes.sourceShape.timestamp : -1;

		return (
			<React.Fragment>
			<div className="side-bar">
				<Dropdown>
					<Dropdown.Toggle
						variant="outline-secondary"
						id="dropdown-basic"
						style={{width: "100%", marginBottom: "10px"}}
					>Add new layer&nbsp;&nbsp;</Dropdown.Toggle>

					<Button 
						variant="outline-secondary"
						style={{width: "100%", marginBottom: "10px"}}
						onClick={() => this.handleSetModal(true)}>Choose Template</Button>
					
					<Button 
						variant="danger"
						style={{width: "100%"}}
						onClick={() => this.handleSetCodeModal(true)}>Get Code</Button>

					<Dropdown.Menu style={{width: "100%"}}>
						<Dropdown.Header>Layers</Dropdown.Header>
						<Dropdown.Item onClick={() => this.createShape("FullyConnected")}>Fully Connected</Dropdown.Item>
						<Dropdown.Item onClick={() => this.createShape("Convolutional")}>Convolutional</Dropdown.Item>
						<Dropdown.Item onClick={() => this.createShape("MaxPooling")}>Max Pooling</Dropdown.Item>
						<Dropdown.Item onClick={() => this.createShape("Dropout")}>Dropout</Dropdown.Item>
						<Dropdown.Item onClick={() => this.createShape("BatchNormalization")}>Batch Norm</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Header>Actions</Dropdown.Header>
						<Dropdown.Item onClick={() => this.createShape("Concatenate")}>Concatenate</Dropdown.Item>
						<Dropdown.Item onClick={() => this.createShape("Flatten")}>Flatten</Dropdown.Item>
						<Dropdown.Item onClick={() => this.createShape("Addition")}>Add</Dropdown.Item>
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
			
			<TemplatesModal 
				show={this.state.modalShow}
				onHide={() => this.handleSetModal(false)}
			/>

			{this.state.codeModalShow && 
				<CodeGeneratorPanel
					show={this.state.codeModalShow}
					onHide={() => this.handleSetCodeModal(false)}
				/>
			}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	shapes: state.shapes,
	config: state.config
});

export default connect(
	mapStateToProps,
	{ addShape, editActiveShape, updateMouseLocation, addToast }
)(SideBar);