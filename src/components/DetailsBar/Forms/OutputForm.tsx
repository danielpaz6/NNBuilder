import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IFormProps } from './IFormProps';
import { ACTIVATION_NONE, ACTIVATION_SOFTMAX, ACTIVATION_LOG_SOFTMAX } from '../../../interfaces/activations';

const OutputForm: React.FunctionComponent<IFormProps> = (props) => {
	
	return (
	<React.Fragment>
		<hr />
		<Form.Group>
			<Form.Label>Parameters</Form.Label>
			<Row>
				<Col>
					<Form.Label style={{fontSize: 12}}>Activation Function</Form.Label>
					<Form.Control 
						as="select"
						value={props.shapeAdditionalInfo.activation}
						onChange={(e:React.ChangeEvent<HTMLSelectElement>) => props.handleParamaterChangeSelect(e, "activation")}	
					>
						<option value={ACTIVATION_NONE}>None</option>
						<option value={ACTIVATION_SOFTMAX}>Softmax</option>
						<option value={ACTIVATION_LOG_SOFTMAX}>Log Softmax</option>
					</Form.Control>
				</Col>
			</Row>
		</Form.Group>
	</React.Fragment>
	);
};

export default OutputForm;
