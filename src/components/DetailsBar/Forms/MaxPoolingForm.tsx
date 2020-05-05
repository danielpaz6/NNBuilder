import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IFormProps } from './IFormProps';

const MaxPoolingForm: React.FunctionComponent<IFormProps> = (props) => {
	
	return (
	<React.Fragment>
		<hr />
		<Form.Group>
			<Form.Label>Parameters</Form.Label>
			<Row>
				<Col>
					<Form.Label style={{fontSize: 12}}>Kernel Size</Form.Label>
					<Form.Control 
						value={props.shapeAdditionalInfo.kernelSize}
						onChange={(e:React.ChangeEvent<HTMLInputElement>) => props.handleParamaterChange(e, "kernelSize")}
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

export default MaxPoolingForm;
