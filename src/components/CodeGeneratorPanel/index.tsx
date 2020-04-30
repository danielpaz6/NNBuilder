import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import './CodeGeneratorPanel.scss';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { addShape, editActiveShape } from '../../store/shapes/actions';
import { updateMouseLocation } from '../../store/mouse/actions';
import { ShapeState, Shape } from '../../store/shapes/types';
import { addToast } from '../../store/toasts/actions';
import { topologicalSort } from '../../model/checkGraph';
import { generateFullPyTorchCode } from '../../model/generateCode/pytorch';

export interface ICodeGeneratorPanelProps {
	show: boolean;
	onHide: () => void;
	
	addShape: typeof addShape;
	editActiveShape: typeof editActiveShape;
	updateMouseLocation: typeof updateMouseLocation;
	addToast: typeof addToast;
	shapes: ShapeState;
}

export interface ICodeGeneratorPanelState {
	pytorchCode: string;
}

class CodeGeneratorPanel extends React.Component<ICodeGeneratorPanelProps, ICodeGeneratorPanelState> {
	state = {
		pytorchCode: ''
	}

	componentDidMount() {
		const shapes = topologicalSort(this.props.shapes.shapes, this.props.shapes.arrows, this.props.addToast);
		this.setState({
			pytorchCode: generateFullPyTorchCode(shapes!, this.props.shapes.arrows)
		});
	}

	public render() {
		return (
		<Modal
			{...this.props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Generated Code
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Tab.Container id="left-tabs-example" defaultActiveKey="pytorch">
					<Row>
						<Col sm={3}>
						<Nav variant="pills" className="flex-column">
							<Nav.Item>
								<Nav.Link eventKey="pytorch">PyTorch</Nav.Link>
							</Nav.Item>
							
							<Nav.Item>
								<Nav.Link eventKey="tensorflow">TensorFlow</Nav.Link>
							</Nav.Item>

							<Nav.Item>
								<Nav.Link eventKey="keras">Keras</Nav.Link>
							</Nav.Item>

							<Nav.Item>
								<Nav.Link eventKey="tfjs">TensorFlow.js</Nav.Link>
							</Nav.Item>

							<Nav.Item>
								<Nav.Link eventKey="caffe">Caffe</Nav.Link>
							</Nav.Item>
						</Nav>
						</Col>
						<Col sm={9}>
						<Tab.Content>
							<Tab.Pane eventKey="pytorch">
								<SyntaxHighlighter
									showLineNumbers={true}
									language="python"
									style={githubGist}
									customStyle={{
										fontSize: 11,
										tabSize: 2,
										maxHeight: 400
									}}
									wrapLines={true}
								>
									{this.state.pytorchCode}
								</SyntaxHighlighter>
							</Tab.Pane>
							<Tab.Pane eventKey="tensorflow">
								TestTest
							</Tab.Pane>
						</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Modal.Body>
		</Modal>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	shapes: state.shapes
});

export default connect(
	mapStateToProps,
	{ addShape, editActiveShape, updateMouseLocation, addToast }
)(CodeGeneratorPanel);
