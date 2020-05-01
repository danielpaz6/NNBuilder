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
	</React.Fragment>
	);
};

export default FullyConnectedForm;
