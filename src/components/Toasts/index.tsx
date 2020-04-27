import * as React from 'react';
import Toast from 'react-bootstrap/Toast';
import { addToast, removeToast } from '../../store/toasts/actions';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { timeSince } from '../../utils/time';
import { ToastsState } from '../../store/toasts/types';

export interface IToastsProps {
	toasts: ToastsState,
	addToast: typeof addToast,
	removeToast: typeof removeToast
}

const delay_time = 3000; // in miliseconds
class Toasts extends React.Component<IToastsProps> {

	handleNotificationRemoval = (timestamp: number) => {
		this.props.removeToast(timestamp);
	}

	public render() {
		const nowTime = new Date().getTime() + delay_time;
		console.log("notifications", this.props.toasts.notifications);

		return (
		<div
		aria-live="polite"
		aria-atomic="true"
		style={{
			position: 'fixed',
			zIndex: 999,
			bottom: 20,
			left: 15
		}}
		>
			{
				this.props.toasts.notifications.map(notification => (
					<Toast
						key={notification.timestamp}
						onClose={() => this.handleNotificationRemoval(notification.timestamp)}
						show={true}
						delay={nowTime - notification.timestamp}
						autohide
					>
						<Toast.Header>
							<strong className="mr-auto">{notification.title}</strong>
							<small>{timeSince(notification.timestamp)}</small>
						</Toast.Header>
						<Toast.Body>{notification.desc}</Toast.Body>
					</Toast>
				))
			}
		</div>
		);
	}
}

/*
const mapStateToProps = (state: AppState) => ({
	toasts: state.toasts.notifications
});

export default connect(
	mapStateToProps,
	{ addToast, removeToast }
)(Toasts);*/

const mapStateToProps = (state: AppState) => ({
	toasts: state.toasts
});

export default connect(
	mapStateToProps,
	{ addToast, removeToast }
)(Toasts);