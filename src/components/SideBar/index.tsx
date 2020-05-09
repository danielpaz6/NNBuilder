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

import {CustomMenu, CustomToggle} from './CustomMenu';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

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
				<ListGroup defaultActiveKey="#link1" variant="flush">
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
			<div className="small-side-bar">
				<Dropdown>
					<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
						<svg viewBox="0 2 24 24" fill="currentColor" width="24" height="24"><path d="M19,5 C19.5522847,5 20,5.44771525 20,6 L20,16 C20,16.5522847 19.5522847,17 19,17 L17,17 L17,19 C17,19.5522847 16.5522847,20 16,20 L6,20 C5.44771525,20 5,19.5522847 5,19 L5,9 C5,8.44771525 5.44771525,8 6,8 L8,8 L8,6 C8,5.44771525 8.44771525,5 9,5 L19,5 Z M8,9 L6,9 L6,19 L16,19 L16,17 L9,17 C8.44771525,17 8,16.5522847 8,16 L8,9 Z M19,6 L9,6 L9,16 L19,16 L19,6 Z"></path></svg>
					</Dropdown.Toggle>

					<Dropdown.Menu as={CustomMenu}>
						<Dropdown.Header>Layers</Dropdown.Header>
						<Dropdown.Item onClick={() => this.createShape("FullyConnected")}>Fully Connected</Dropdown.Item>
						<Dropdown.Item onClick={() => this.createShape("Convolutional")}>Convolutional</Dropdown.Item>
						<Dropdown.Item onClick={() => this.createShape("MaxPooling")}>Max Pooling</Dropdown.Item>
						<Dropdown.Item onClick={() => this.createShape("Dropout")}>Dropout</Dropdown.Item>
						<Dropdown.Item onClick={() => this.createShape("BatchNormalization")}>Batch Norm</Dropdown.Item>
						<Dropdown.Header>Actions</Dropdown.Header>
						<Dropdown.Item onClick={() => this.createShape("Concatenate")}>Concatenate</Dropdown.Item>
						<Dropdown.Item onClick={() => this.createShape("Flatten")}>Flatten</Dropdown.Item>
						<Dropdown.Item onClick={() => this.createShape("Addition")}>Add</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>

				<button onClick={() => this.handleSetModal(true)}>
					<svg viewBox="0 1 24 24" fill="currentColor" width="24" height="24"><path d="M17,17.8999819 L17,19 C17,19.5522847 16.5522847,20 16,20 L7,20 C6.44771525,20 6,19.5522847 6,19 L6,6 C6,5.44771525 6.44771525,5 7,5 L16,5 C16.5522847,5 17,5.44771525 17,6 L17,8.10001812 C19.2822403,8.56328845 21,10.5810421 21,13 C21,14.2006351 20.5768174,15.3024306 19.8714727,16.1643659 L21.8535534,18.1464466 C22.0488155,18.3417088 22.0488155,18.6582912 21.8535534,18.8535534 C21.6582912,19.0488155 21.3417088,19.0488155 21.1464466,18.8535534 L19.1643659,16.8714727 C18.5482866,17.3756268 17.8096662,17.7356283 17,17.8999819 L17,17.8999819 Z M16,8 L16,6 L7,6 L7,19 L16,19 L16,18 C13.2385763,18 11,15.7614237 11,13 C11,10.2385763 13.2385763,8 16,8 L16,8 Z M16,17 C18.209139,17 20,15.209139 20,13 C20,10.790861 18.209139,9 16,9 C13.790861,9 12,10.790861 12,13 C12,15.209139 13.790861,17 16,17 Z"></path></svg>
				</button>
				
				<OverlayTrigger
						overlay={<Tooltip id="tooltip-generate-code">Generate Code</Tooltip>}
						placement="right"
				>
					<button onClick={() => this.handleSetCodeModal(true)}>
						<svg viewBox="0 1.5 24 24" fill="currentColor" width="24" height="24"><path d="M10.9743282,17.1581541 C10.8869821,17.4201184 10.6038101,17.5616743 10.3418459,17.4743282 C10.0798816,17.3869821 9.93832565,17.1038101 10.0256718,16.8418459 L12.9296415,8.13239986 C13.0169876,7.87043562 13.3001596,7.72887965 13.5621239,7.81622576 C13.8240881,7.90357187 13.9656441,8.18674387 13.878298,8.44870812 L10.9743282,17.1581541 Z M4.47182532,12.5 L8.27591774,14.7824555 C8.51270787,14.9245295 8.5894904,15.2316597 8.44741632,15.4684498 C8.30534224,15.7052399 7.99821212,15.7820225 7.76142198,15.6399484 L3.24275212,12.9287465 C2.91908263,12.7345448 2.91908263,12.2654552 3.24275212,12.0712535 L7.77718725,9.35059246 C8.01397739,9.20851838 8.32110752,9.28530091 8.4631816,9.52209104 C8.60525568,9.75888118 8.52847314,10.0660113 8.29168301,10.2080854 L4.47182532,12.5 Z M15.7241578,14.7777259 L19.5282502,12.4952704 L15.7083926,10.2033558 C15.4716024,10.0612817 15.3948199,9.75415159 15.536894,9.51736146 C15.678968,9.28057133 15.9860982,9.2037888 16.2228883,9.34586288 L20.7573234,12.066524 C21.0809929,12.2607257 21.0809929,12.7298152 20.7573234,12.9240169 L16.2386536,15.6352188 C16.0018634,15.7772929 15.6947333,15.7005103 15.5526592,15.4637202 C15.4105852,15.2269301 15.4873677,14.9198 15.7241578,14.7777259 Z"></path></svg>
					</button>
				</OverlayTrigger>
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