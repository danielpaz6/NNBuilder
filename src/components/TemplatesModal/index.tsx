import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import Template from './Template';

export interface ITemplatesModalProps {
	show: boolean;
	onHide: () => void;
	//setShapes: typeof setShapes;
}

class TemplatesModal extends React.Component<ITemplatesModalProps> {
	handleTemplate = (temp: string) => {
		/*switch(temp) {
			case "resnet":
				this.props.setShapes(ResNet);
				break;

			case "blank":
				this.props.setShapes(seedNewShapes);
				break;
		}*/

		this.props.onHide();
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
					Select Pretrained Networks
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<CardDeck>
					<Template
						chooseTemplate={() => this.handleTemplate("resnet")}
						title={"ResNet"}
						desc={"A ResNet Architecture"} />
					
					<Template
						chooseTemplate={() => this.handleTemplate("blank")}
						title={"Blank"}
						desc={"Open new template"} />
				</CardDeck>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
		);
	}
}

export default /*connect(
	null,
	{ setShapes }
)*/(TemplatesModal);