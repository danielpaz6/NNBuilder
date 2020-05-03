import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IFormProps } from './IFormProps';

const FullyConnectedForm: React.FunctionComponent<IFormProps> = (props) => {
	
	return (
	<React.Fragment>
		<hr />
		<Form.Group>
			<Form.Label>Parameters</Form.Label>
			<Row>
				<Col>
					<Form.Label style={{fontSize: 12}}>Input<br />Dimension</Form.Label>
					<Form.Control 
						value={props.shapeAdditionalInfo.inputDimension}
						onChange={(e:React.ChangeEvent<HTMLInputElement>) => props.handleParamaterChange(e, "inputDimension")}
						size="sm"
						bsPrefix={'form-control fixed-size'}
						type="number"
						/>
				</Col>
				<Col>
					<Form.Label style={{fontSize: 12}}>Output<br />Dimension</Form.Label>
					<Form.Control 
						value={props.shapeAdditionalInfo.outputDimension}
						onChange={(e:React.ChangeEvent<HTMLInputElement>) => props.handleParamaterChange(e, "outputDimension")}
						size="sm"
						bsPrefix={'form-control fixed-size'}
						type="number"
						/>
				</Col>
			</Row>
		</Form.Group>

		<hr />
		<Form.Group>
			<Form.Label>Style</Form.Label>
			<Row>
				<Col>
					<Form.Label>Layers Size</Form.Label>
					<Form>
					<Form.Check
						custom
						type="radio"
						label="Small size"
						name="fcstyle"
						id="fc-small"
						onClick={() => props.handleParameterChangeByValue(5, "nodesCount")}
					/>
					<Form.Check
						custom
						type="radio"
						label="Medium size"
						name="fcstyle"
						id="fc-medium"
						onClick={() => props.handleParameterChangeByValue(7, "nodesCount")}
					/>
					<Form.Check
						custom
						type="radio"
						label="Large size"
						name="fcstyle"
						id="fc-large"
						onClick={() => props.handleParameterChangeByValue(9, "nodesCount")}
					/>
					</Form>
				</Col>
			</Row>
		</Form.Group>
	</React.Fragment>
	);
};

export default FullyConnectedForm;
