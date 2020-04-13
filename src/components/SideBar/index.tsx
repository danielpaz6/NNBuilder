import * as React from 'react';
import './sidebar.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';


export interface ISideBarProps {
}

export default class SideBar extends React.Component<ISideBarProps> {
	public render() {
		return (
			<div className="side-bar">
				<Dropdown>
					<Dropdown.Toggle variant="success" id="dropdown-basic" style={{width: "100%"}}>
						Components
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
						<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
						<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<br />
				<Button>Fully Connected</Button><br /><br />
				<Button>Convlution</Button><br /><br />
				<Button>Max Pooling</Button><br /><br />
			</div>
		);
	}
}
