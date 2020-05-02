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
					<Form.Label style={{fontSize: 12}}>In<br />Channels</Form.Label>
					<Form.Control 
						value={props.shapeAdditionalInfo.inChannels}
						onChange={(e:React.ChangeEvent<HTMLInputElement>) => props.handleParamaterChange(e, "inChannels")}
						size="sm"
						bsPrefix={'form-control fixed-size'}
						type="number"
						/>
				</Col>
				<Col>
					<Form.Label style={{fontSize: 12}}>Out<br />Channels</Form.Label>
					<Form.Control 
						value={props.shapeAdditionalInfo.outChannels}
						onChange={(e:React.ChangeEvent<HTMLInputElement>) => props.handleParamaterChange(e, "outChannels")}
						size="sm"
						bsPrefix={'form-control fixed-size'}
						type="number"
						/>
				</Col>
			</Row>
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
				<Col>
					<Form.Label style={{fontSize: 12}}>Stride</Form.Label>
					<Form.Control 
						value={props.shapeAdditionalInfo.stride}
						onChange={(e:React.ChangeEvent<HTMLInputElement>) => props.handleParamaterChange(e, "stride")}
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
