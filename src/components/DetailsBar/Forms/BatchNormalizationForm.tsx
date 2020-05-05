import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IFormProps } from './IFormProps';

const BatchNormalizationForm: React.FunctionComponent<IFormProps> = (props) => {
	
	return (
	<React.Fragment>
		<hr />
		<Form.Group>
			<Form.Label>Parameters</Form.Label>
			<Row>
				<Col>
					<Form.Label style={{fontSize: 12}}>Select Dimension</Form.Label>
					<Form.Control 
						as="select"
						value={props.shapeAdditionalInfo.dimension}
						onChange={(e:React.ChangeEvent<HTMLSelectElement>) => props.handleParamaterChangeSelect(e, "dimension")}	
					>
						<option>2D</option>
						<option>1D</option>
					</Form.Control>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form.Label style={{fontSize: 12}}>Number of Features</Form.Label>
					<Form.Control 
						value={props.shapeAdditionalInfo.numFeatures}
						onChange={(e:React.ChangeEvent<HTMLInputElement>) => props.handleParamaterChange(e, "numFeatures")}
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

export default BatchNormalizationForm;
