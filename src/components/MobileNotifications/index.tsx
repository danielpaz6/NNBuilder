import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './mobilenotification.scss';

interface IMobileNotificationsProps {
}

const MobileNotifications: React.FunctionComponent<IMobileNotificationsProps> = (props) => {
	const [show, setShow] = useState(true);

	const handleClose = () => setShow(false);

	const isMobile = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);

	return (
		
		<Modal show={isMobile && show} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Notification</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<p>This website is not yet fully compatible with mobile devices.</p>
				<p>We suggest you to consider open this website using desktop browser.</p>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>I Understand</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default MobileNotifications;
