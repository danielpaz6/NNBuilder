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
	editActivationFunction
} from '../../store/shapes/actions';
import { formsMap } from './Forms/FormList';
import { ACTIVATION_NONE, ACTIVATION_RELU, ACTIVATION_TANH, ACTIVATION_SIGMOID, AllActivationFunctions } from '../../interfaces/activations';


interface IDetailsBarProps {
	shapes: ShapeState;
	editShapeName: typeof editShapeName;
	updateShapePositionAction: typeof updateShapePositionAction;
	updateShapeDescription: typeof updateShapeDescription;
	setShapeAdditionalInfo: typeof setShapeAdditionalInfo;
	editActivationFunction: typeof editActivationFunction;
}

interface IDetailsBarState {
}

class DetailsBar extends React.Component<IDetailsBarProps, IDetailsBarState> {

	handleParamaterChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
		const value = +event.target.value;
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

	handleParameterChangeByValue = (value: number, key: string) => {
		this.props.setShapeAdditionalInfo(
			this.props.shapes.sourceShape!.timestamp,
			key,
			value	
		);
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

			if(formsMap[shape.shape.name + "Form"]) {
				parameters = React.createElement(formsMap[shape.shape.name + "Form"], {
					handleParamaterChange: this.handleParamaterChange,
					handleParameterChangeByValue: this.handleParameterChangeByValue,
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
				<Form.Group controlId="description">
					{/*
						Note: There's a warning when openning the Accordion.Toggle:
						"Warning: findDOMNode is deprecated in StrictMode"

						it is known issue in react-bootstrap package:
						https://github.com/react-bootstrap/react-bootstrap/issues/5075

						And will be fixed.
					*/}
					<Accordion defaultActiveKey={shape.description ? '1' : '0'}>
						<Accordion.Toggle as={Form.Label} eventKey="1" id="basic-nav-dropdown">				
							Description <span className="dropdown-icon"></span>
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="1">
							<Form.Control
								as="textarea"
								rows="3"
								onChange={this.handleDescriptionChange}
								value={shape.description ? shape.description : ""} />
						</Accordion.Collapse>
					</Accordion>
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
						onChange={this.handleArrowActivationChange}> 

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
	shapes: state.shapes
});

export default connect(
	mapStateToProps,
	{ editShapeName, updateShapePositionAction, updateShapeDescription, setShapeAdditionalInfo,
		editActivationFunction }
)(DetailsBar);
