import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IFormProps } from './IFormProps';

const InputForm: React.FunctionComponent<IFormProps> = (props) => {
	
	return (
	<React.Fragment>
		<hr />
		<Form.Group>
			<Form.Label>Parameters</Form.Label>
			<Row>
				<Col>
					<Form.Label style={{fontSize: 12}}>Input type</Form.Label>
					<Form.Control 
						value={props.shapeAdditionalInfo.type}
						onChange={(e:React.ChangeEvent<HTMLInputElement>) => props.handleParamaterChange(e, "type")}
						size="sm"
						bsPrefix={'form-control fixed-size'}
						/>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form.Label style={{fontSize: 12}}>Array Dimension</Form.Label>
					<Form.Control 
						as="select"
						value={props.shapeAdditionalInfo.dimension}
						onChange={(e:React.ChangeEvent<HTMLSelectElement>) => props.handleParamaterChangeSelect(e, "dimension")}	
					>
						<option>1D</option>
						<option>2D</option>
						<option>3D</option>
					</Form.Control>
				</Col>
			</Row>
			{props.shapeAdditionalInfo.dimension === "1D" && 
			<Row style={{marginTop: "5px"}}>
				<Col>
					<Form.Label style={{fontSize: 12}}>Dimension 1<br />Size</Form.Label>
					<Form.Control 
						value={props.shapeAdditionalInfo.dim1}
						onChange={(e:React.ChangeEvent<HTMLInputElement>) => props.handleParamaterChange(e, "dim1")}
						size="sm"
						bsPrefix={'form-control fixed-size'}
						type="number"
						/>
				</Col>
			</Row>
			}
			{props.shapeAdditionalInfo.dimension === "2D" && 
			<Row style={{marginTop: "5px"}}>
				<Col>
					<Form.Label style={{fontSize: 12}}>Dimension 1<br />Size</Form.Label>
					<Form.Control 
						value={props.shapeAdditionalInfo.dim1}
						onChange={(e:React.ChangeEvent<HTMLInputElement>) => props.handleParamaterChange(e, "dim1")}
						size="sm"
						bsPrefix={'form-control fixed-size'}
						type="number"
						/>
				</Col>
				<Col>
					<Form.Label style={{fontSize: 12}}>Dimension 2<br />Size</Form.Label>
					<Form.Control 
						value={props.shapeAdditionalInfo.dim2}
						onChange={(e:React.ChangeEvent<HTMLInputElement>) => props.handleParamaterChange(e, "dim2")}
						size="sm"
						bsPrefix={'form-control fixed-size'}
						type="number"
						/>
				</Col>
			</Row>
			}
			{props.shapeAdditionalInfo.dimension === "3D" && 
			<React.Fragment>
				<Row style={{marginTop: "5px"}}>
					<Col>
						<Form.Label style={{fontSize: 12}}>Dimension 1<br />Size</Form.Label>
						<Form.Control 
							value={props.shapeAdditionalInfo.dim1}
							onChange={(e:React.ChangeEvent<HTMLInputElement>) => props.handleParamaterChange(e, "dim1")}
							size="sm"
							bsPrefix={'form-control fixed-size'}
							type="number"
							/>
					</Col>
					<Col>
						<Form.Label style={{fontSize: 12}}>Dimension 2<br />Size</Form.Label>
						<Form.Control 
							value={props.shapeAdditionalInfo.dim2}
							onChange={(e:React.ChangeEvent<HTMLInputElement>) => props.handleParamaterChange(e, "dim2")}
							size="sm"
							bsPrefix={'form-control fixed-size'}
							type="number"
							/>
					</Col>
				</Row>
				<Row style={{marginTop: "5px"}}>
					<Col>
						<Form.Label style={{fontSize: 12}}>Dimension 3<br />Size</Form.Label>
						<Form.Control 
							value={props.shapeAdditionalInfo.dim3}
							onChange={(e:React.ChangeEvent<HTMLInputElement>) => props.handleParamaterChange(e, "dim3")}
							size="sm"
							bsPrefix={'form-control fixed-size'}
							type="number"
							/>
					</Col>
				</Row>
			</React.Fragment>
			}
		</Form.Group>
	</React.Fragment>
	);
};

export default InputForm;