import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IFormProps } from './IFormProps';

const DropoutForm: React.FunctionComponent<IFormProps> = (props) => {
	
	return (
	<React.Fragment>
		<hr />
		<Form.Group>
			<Form.Label>Parameters</Form.Label>
			<Row>
				<Col>
					<Form.Label style={{fontSize: 12}}>Probability of an element to be zeroed</Form.Label>
					<Form.Control 
						value={props.shapeAdditionalInfo.p}
						onChange={(e:React.ChangeEvent<HTMLInputElement>) => props.handleParamaterChange(e, "p")}
						size="sm"
						bsPrefix={'form-control fixed-size'}
						type="number"
						step="0.1"
						max="1"
						min="0"
						/>
				</Col>
			</Row>
		</Form.Group>
	</React.Fragment>
	);
};

export default DropoutForm;
