import * as React from 'react';
import Card from 'react-bootstrap/Card';
//import Button from 'react-bootstrap/Button';
//import img from '../../assets/templates/resnet.png';
import './template.scss';

export interface ITemplateProps {
	title: string;
	desc: string;
	chooseTemplate: () => void;
}

export default class Template extends React.Component<ITemplateProps> {

	public render() {
		return (
		<Card bsPrefix={"card template-card"} onClick={this.props.chooseTemplate}>
			<Card.Body>
				<strong>{this.props.title}</strong>
			</Card.Body>
		<Card.Footer>{this.props.desc}</Card.Footer>
		</Card>
		);
	}
}
