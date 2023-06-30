import * as React from 'react';
import './detailsbar.scss';
//import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
//import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { ShapeState } from '../../store/shapes/types';
import { 
	editShapeName,
	updateShapePositionAction, 
	updateShapeDescription,
	setShapeAdditionalInfo,
	editActivationFunction,
	updateCenterPosition
} from '../../store/shapes/actions';
import { formsMap } from './Forms/FormList';
import { ACTIVATION_NONE, ACTIVATION_RELU, ACTIVATION_TANH, ACTIVATION_SIGMOID, AllActivationFunctions } from '../../interfaces/activations';
import FullyConnected from '../DiagramContainer/Shapes/FullyConnected';
import { ConfigState } from '../../store/config/types';


interface IDetailsBarProps {
	shapes: ShapeState;
	config: ConfigState;
	editShapeName: typeof editShapeName;
	updateShapePositionAction: typeof updateShapePositionAction;
	updateShapeDescription: typeof updateShapeDescription;
	setShapeAdditionalInfo: typeof setShapeAdditionalInfo;
	editActivationFunction: typeof editActivationFunction;
	updateCenterPosition: typeof updateCenterPosition;
}

interface IDetailsBarState {
}

class DetailsBar extends React.Component<IDetailsBarProps, IDetailsBarState> {

	handleParamaterChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
		const value = event.target.value;
		this.props.setShapeAdditionalInfo(
			this.props.shapes.sourceShape!.timestamp,
			key,
			value	
		);
	}

	handleArrowActivationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const activation = event.target.value as AllActivationFunctions;
		this.props.editActivationFunction(activation);
	}

	handleParamaterChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>, key: string) => {
		const value = event.target.value;
		this.props.setShapeAdditionalInfo(
			this.props.shapes.sourceShape!.timestamp,
			key,
			value	
		);
	}

	handleParameterChangeByValue = (value: number, key: string) => {
		this.props.setShapeAdditionalInfo(
			this.props.shapes.sourceShape!.timestamp,
			key,
			value	
		);
		
		// If we re-sized the Fully Connected layer, we should update its center position as well.
		if(this.props.shapes.sourceShape && this.props.shapes.sourceShape.shape === FullyConnected) {
			this.props.updateCenterPosition(this.props.config.designTemplate, FullyConnected.centerPositionAbstract(+value));
		}
	}
	
	handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.editShapeName(this.props.shapes.sourceShape!.timestamp, event.target.value);
	}

	handleChangePosition = (event: React.ChangeEvent<HTMLInputElement>, axisToChange : number) => {
		const value = +event.target.value;

		// Change X Axis
		if(axisToChange === 0) {
			this.props.updateShapePositionAction(
				this.props.shapes.sourceShape!.timestamp,
				value > 0 ? value : 0,
				this.props.shapes.sourceShape!.y
			);
		}
		// Change Y Axis
		else {
			this.props.updateShapePositionAction(
				this.props.shapes.sourceShape!.timestamp,
				this.props.shapes.sourceShape!.x,
				value > 0 ? value : 0
			);
		}
	}

	handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.updateShapeDescription(
			this.props.shapes.sourceShape!.timestamp,
			event.target.value
		);
	}

	render() {
		if(this.props.shapes.sourceShape)
		{
			const shape = this.props.shapes.sourceShape;

			let parameters: JSX.Element | undefined = undefined;

			if(formsMap.has(shape.shape)) {
				parameters = React.createElement(formsMap.get(shape.shape)!, {
					handleParamaterChange: this.handleParamaterChange,
					handleParameterChangeByValue: this.handleParameterChangeByValue,
					handleParamaterChangeSelect: this.handleParamaterChangeSelect,
					shapeAdditionalInfo: shape.additionalInfo!
				});
			}

			return <aside className="component-info">
				<h6 style={{textAlign: "center"}}>Layer Properties</h6>
				<hr />
				<Form.Group controlId="layerName">
					<Form.Label>Layer name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Layer Name"
						value={shape.name}
						onChange={this.handleChangeName} />
				</Form.Group>
				{parameters}
				<hr />
				<Form.Group>
					<Form.Label>Layer Position</Form.Label>
					<Row>
						<Col style={{paddingRight: "3px"}}>
							<Form.Control
								type="number"
								step="5"
								placeholder="X"
								size="sm"
								bsPrefix={'form-control fixed-size'}
								value={shape.x}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChangePosition(e, 0)} />
						</Col>
						<Col style={{paddingLeft: "3px"}}>
							<Form.Control
								type="number"
								step="5"
								placeholder="Y"
								size="sm"
								bsPrefix={'form-control fixed-size'}
								value={shape.y}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChangePosition(e, 1)} 
								 />
						</Col>
					</Row>
				</Form.Group>
				<hr />
				<Form.Group controlId="description">
					{/*
						Note: There's a warning when openning the Accordion.Toggle:
						"Warning: findDOMNode is deprecated in StrictMode"

						it is known issue in react-bootstrap package:
						https://github.com/react-bootstrap/react-bootstrap/issues/5075

						And will be fixed.
					*/}
					<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							onChange={this.handleDescriptionChange}
							value={shape.description ? shape.description : ""} />
				</Form.Group>
			</aside>;
		}
		else if(this.props.shapes.sourceArrow)
		{
			const getArrowActivation = this.props.shapes.arrows.get(
				[this.props.shapes.sourceArrow.source,
				this.props.shapes.sourceArrow.target]
			)!;

			return <aside className="component-info">
				<h6 style={{textAlign: "center"}}>Arrow Properties</h6>
				<hr />
				<Form.Group controlId="activation-function">
					<Form.Label>Activation Function</Form.Label>
					<Form.Control 
						value={getArrowActivation} 
						as="select" 
						style={{paddingRight: "10px"}}
						onChange={(e:any) => this.handleArrowActivationChange(e)}> 

						<option 
							value={ACTIVATION_NONE}>None</option>
						<option 
							value={ACTIVATION_SIGMOID}>Sigmoid</option>
						<option 
							value={ACTIVATION_RELU}>ReLU</option>
						<option 
							value={ACTIVATION_TANH}>Tanh</option>
					</Form.Control>
				</Form.Group>
			</aside>
		}
		else
			return null;
	}
};

const mapStateToProps = (state: AppState) => ({
	shapes: state.shapes,
	config: state.config
});

export default connect(
	mapStateToProps,
	{ editShapeName, updateShapePositionAction, updateShapeDescription, setShapeAdditionalInfo,
		editActivationFunction, updateCenterPosition }
)(DetailsBar);
