import * as React from 'react';
import "./toolbar.scss";
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { setShapes } from '../../store/shapes/actions';
import { ShapeState } from '../../store/shapes/types';
import { seedNewShapes } from '../../utils/seedShapes';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ConfigState } from '../../store/config/types';
import { updateDesignTemplate } from "../../store/config/actions";
import { TEMPLATE_ABSTRACT, TEMPLATE_FILLED } from '../../interfaces/designTemplates';
import Canvg from 'canvg';
import Form from 'react-bootstrap/Form';
import logo from '../../logo.svg';


export interface IToolBarProps {
	shapes: ShapeState;
	config: ConfigState;
	setShapes: typeof setShapes;
	updateDesignTemplate: typeof updateDesignTemplate;
}

export interface IToolBarState {
	isFullScreenEnabled: boolean
}

class ToolBar extends React.Component<IToolBarProps, IToolBarState> {
	state = {
		isFullScreenEnabled: false
	}

	refSVG = React.createRef<SVGSVGElement>();
	refCanvas = React.createRef<HTMLCanvasElement>();
	refLink = React.createRef<HTMLAnchorElement>();

	async componentDidMount() {
		/*const canvas = document.querySelector('canvas')!;
		const ctx = canvas.getContext('2d');
	
		const v = await Canvg.from(ctx, './svgs/1.svg');*/

		/*const canvas = this.refCanvas.current!;
		const ctx = canvas.getContext('2d')!;

		const svgContent = "<svg>" + this.refSVG.current!.innerHTML + "</svg>";
		const v = await Canvg.from(ctx, svgContent);
		
		v.start();*/
	}

	handleDownloadImage = async () => {
		
		// Extract SVG to Canvas
		
		const canvas = this.refCanvas.current!;
		const ctx = canvas.getContext('2d')!;
		const svgContent = "<svg>" + this.props.config.svgRef!.innerHTML + "</svg>";
		const v = await Canvg.from(ctx, svgContent);
		v.start();

		// Downloading the canvas 

		const download = this.refLink.current!;
		const image = canvas.toDataURL("image/png")
			.replace("image/png", "image/octet-stream");
		download.setAttribute("href", image);
	}

	handleStyleTemplate = () => {
		if(this.props.config.designTemplate === TEMPLATE_ABSTRACT) {
			this.props.updateDesignTemplate(TEMPLATE_FILLED);
		}
		else {
			this.props.updateDesignTemplate(TEMPLATE_ABSTRACT);
		}
	}

	handleNewTemplate = () => {
		this.props.setShapes(seedNewShapes);
	}

	toggleFullScreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen(); 
			}
		}

		this.setState((oldState) => ({
			isFullScreenEnabled: !oldState.isFullScreenEnabled
		}));
	}

	public render() {
		return (
			<div className="toolbar">
				<canvas ref={this.refCanvas} id="myCanvas" width="1000px" height="500px" style={{background: "white", display: "none"}}></canvas>
				<div className="left-side">
					<div className="title">
						<div className="image-container">
							<img src={logo} alt="NNBuilder.io logo" />
						</div>
						<div className="title-container">
							<h1>NNBuilder.io</h1>
						</div>
					</div>
					<OverlayTrigger
						overlay={<Tooltip id="tooltip-new-template">Start new template</Tooltip>}
						placement="bottom"
					>
						<button onClick={this.handleNewTemplate}>
							<svg viewBox="5 5 15 15" fill="currentColor" width="9" height="15"><path d="M13,6.70710678 L13,9 L15.2928932,9 L13,6.70710678 Z M17,19 C17,19.5522847 16.5522847,20 16,20 L7,20 C6.44771525,20 6,19.5522847 6,19 L6,6 C6,5.44771525 6.44771525,5 7,5 L12.7099045,5 L17,9.2995551 L17,19 Z M16,10 L12,10 L12,6 L7,6 L7,19 L16,19 L16,10 Z"></path></svg>
						</button>
					</OverlayTrigger>
					
					<button>
						<svg viewBox="4 5 15 15" fill="currentColor" width="9" height="15"><path d="M16.679,5.60187506 L18.381,7.30587506 C19.207,8.13287506 19.207,9.47787506 18.381,10.3058751 L10.211,18.4858751 L4,19.9998751 L5.512,13.7818751 L13.682,5.60187506 C14.481,4.79987506 15.878,4.79887506 16.679,5.60187506 Z M8.66091072,16.0462125 L9.973,17.3598751 L15.625,11.7018751 L12.289,8.36087506 L6.637,14.0198751 L7.95422762,15.3386821 L11.1467061,12.1463747 C11.3419735,11.9511178 11.6585559,11.9511262 11.8538129,12.1463936 C12.0490698,12.341661 12.0490613,12.6582435 11.8537939,12.8535004 L8.66091072,16.0462125 Z M16.306,11.0198751 L17.7,9.62387506 C18.15,9.17287506 18.15,8.43787506 17.7,7.98687506 L15.998,6.28287506 C15.561,5.84587506 14.801,5.84687506 14.364,6.28287506 L12.97,7.67887506 L16.306,11.0198751 Z M5.426,18.5738751 L8.995,17.7438751 L6.254,14.9988751 L5.426,18.5738751 Z"></path></svg>
					</button>

						<a id="download" download="myModel.png" ref={this.refLink}>
						<OverlayTrigger
							overlay={<Tooltip id="tooltip-download-svg">Download Image Snapshot of Your Model (MyModel.png)</Tooltip>}
							placement="bottom"
						>
							<button onClick={this.handleDownloadImage}>
								<svg viewBox="4 4 15 15" fill="currentColor" width="9" height="15"><path d="M5,13 L5,17 C5,17.5522847 5.44771525,18 6,18 L17,18 C17.5522847,18 18,17.5522847 18,17 L18,13 L19,13 L19,17 C19,18.1045695 18.1045695,19 17,19 L6,19 C4.8954305,19 4,18.1045695 4,17 L4,13 L5,13 Z M11,13.2928932 L11,5 L12,5 L12,13.2928932 L14.1464466,11.1464466 C14.3417088,10.9511845 14.6582912,10.9511845 14.8535534,11.1464466 C15.0488155,11.3417088 15.0488155,11.6582912 14.8535534,11.8535534 L11.5,15.2071068 L8.14644661,11.8535534 C7.95118446,11.6582912 7.95118446,11.3417088 8.14644661,11.1464466 C8.34170876,10.9511845 8.65829124,10.9511845 8.85355339,11.1464466 L11,13.2928932 Z"></path></svg>
							</button>
						</OverlayTrigger>
						</a>
				</div>

				<div className="right-side">
					<OverlayTrigger
						overlay={<Tooltip id="tooltip-toggle-template">Change Style Template</Tooltip>}
						placement="bottom"
					>
						<Form style={{float: "left", marginTop: "1px", marginRight:"-10px"}}>
							<Form.Check 
								checked={this.props.config.designTemplate === TEMPLATE_ABSTRACT}
								onClick={this.handleStyleTemplate}
								type="switch"
								id="custom-switch"
								label=""
							/>
						</Form>
						{/*<button onClick={this.handleStyleTemplate}>
							<svg viewBox="3 5 12 12" fill="currentColor" width="24" height="24"><path d="M9,3 C11.209139,3 13,4.790861 13,7 C13,7.2006429 12.9887988,7.37261183 12.9663963,7.51590677 C14.180506,8.20261598 15,9.50560645 15,11 C15,13.209139 13.209139,15 11,15 C10.271376,15 9.58825351,14.8051848 8.99987956,14.4648015 C8.41251188,14.8049665 7.7290322,15 7,15 C4.790861,15 3,13.209139 3,11 C3,9.50560645 3.81949397,8.20261598 5.03360371,7.51590677 C5.0112047,7.34686296 5,7.17473998 5,7 C5,4.790861 6.790861,3 9,3 Z M5.30200941,8.52749838 C4.52278137,9.06033325 4,9.99405278 4,11 C4,12.6568542 5.34314575,14 7,14 C7.39828227,14 7.77843697,13.9223866 8.12616463,13.7814594 C7.42860086,13.0613619 6.85005188,11.8812408 7.03314346,10.4826921 C6.24401855,10.0695038 5.58474731,9.24058533 5.30200941,8.52749838 Z M9,4 C7.34314575,4 6,5.34314575 6,7 C6,8.65685425 7.34314575,10 9,10 C10.6568542,10 12,8.65685425 12,7 C12,5.34314575 10.6568542,4 9,4 Z"></path></svg>
						</button>*/}
					</OverlayTrigger>
					<OverlayTrigger
						overlay={<Tooltip id="tooltip-toggle-fullscreen">Toggle Fullscreen Mode</Tooltip>}
						placement="bottom"
					>
						<button onClick={this.toggleFullScreen}>
							{!this.state.isFullScreenEnabled ? 
							<svg viewBox="0 0 1024 1024"><path d="M959.688 920.068l0.31-176c0.040-22.094-17.84-40.032-39.93-40.070-22.092-0.040-40.032 17.838-40.070 39.93l-0.142 79.672-235.734-235.732c-15.622-15.622-40.948-15.622-56.57 0s-15.622 40.948 0 56.568l235.442 235.442-78.946-0.1c-22.092-0.028-40.022 17.86-40.050 39.952-0.014 11.064 4.464 21.084 11.714 28.334 7.228 7.224 17.208 11.702 28.236 11.714l175.688 0.22c22.086 0.028 40.014-17.846 40.052-39.93zM920.178 64.228l-176-0.308c-22.094-0.040-40.032 17.84-40.070 39.93-0.040 22.092 17.838 40.032 39.93 40.070l79.672 0.14-235.732 235.734c-15.622 15.622-15.622 40.948 0 56.568s40.948 15.622 56.568 0l235.442-235.442-0.1 78.946c-0.028 22.092 17.86 40.022 39.952 40.050 11.064 0.014 21.084-4.464 28.334-11.714 7.224-7.228 11.702-17.208 11.714-28.236l0.22-175.688c0.026-22.082-17.846-40.010-39.93-40.050zM64.236 103.742l-0.308 176c-0.040 22.094 17.84 40.032 39.93 40.070 22.092 0.040 40.032-17.84 40.070-39.93l0.14-79.672 235.734 235.73c15.622 15.622 40.948 15.622 56.568 0s15.622-40.946 0-56.566l-235.442-235.442 78.946 0.098c22.092 0.028 40.022-17.86 40.050-39.95 0.014-11.066-4.464-21.086-11.714-28.336-7.228-7.222-17.208-11.7-28.236-11.714l-175.688-0.218c-22.084-0.026-40.012 17.844-40.050 39.93zM103.748 959.766l176 0.308c22.094 0.040 40.032-17.84 40.070-39.93 0.040-22.092-17.84-40.032-39.93-40.070l-79.672-0.14 235.73-235.734c15.622-15.622 15.622-40.948 0-56.568s-40.946-15.622-56.566 0l-235.442 235.442 0.098-78.946c0.028-22.092-17.86-40.022-39.95-40.050-11.066-0.014-21.086 4.464-28.336 11.714-7.222 7.228-11.7 17.208-11.714 28.236l-0.218 175.688c-0.026 22.082 17.844 40.010 39.93 40.050z"></path></svg>
							:
							<svg viewBox="5 4 15 15" fill="currentColor" width="9" height="13" className="active_button"><path d="M10.9393398,12 L6,7.06066017 C5.70710678,6.76776695 5.70710678,6.29289322 6,6 C6.29289322,5.70710678 6.76776695,5.70710678 7.06066017,6 L12,10.9393398 L16.9393398,6 C17.232233,5.70710678 17.7071068,5.70710678 18,6 C18.2928932,6.29289322 18.2928932,6.76776695 18,7.06066017 L13.0606602,12 L18,16.9393398 C18.2928932,17.232233 18.2928932,17.7071068 18,18 C17.7071068,18.2928932 17.232233,18.2928932 16.9393398,18 L12,13.0606602 L7.06066017,18 C6.76776695,18.2928932 6.29289322,18.2928932 6,18 C5.70710678,17.7071068 5.70710678,17.232233 6,16.9393398 L10.9393398,12 Z"></path></svg>
							}
						</button>
					</OverlayTrigger>

					<button>
						<svg viewBox="0 0 1024 1024"><path d="M960.132 210.186c0-0.444-0.050-0.874-0.066-1.312-0.024-0.684-0.044-1.366-0.104-2.046-0.060-0.74-0.158-1.468-0.26-2.198-0.080-0.564-0.156-1.128-0.258-1.692-0.146-0.792-0.328-1.566-0.518-2.34-0.124-0.508-0.244-1.014-0.39-1.518-0.224-0.784-0.488-1.548-0.76-2.312-0.176-0.49-0.344-0.98-0.538-1.466-0.302-0.754-0.642-1.486-0.988-2.216-0.224-0.472-0.436-0.946-0.68-1.41-0.398-0.762-0.838-1.496-1.284-2.228-0.242-0.396-0.466-0.798-0.722-1.19-0.608-0.924-1.262-1.81-1.942-2.678-0.132-0.168-0.248-0.346-0.382-0.512-0.98-1.212-2.028-2.364-3.14-3.454l-104.020-104.9c-3.714-3.714-7.988-6.518-12.542-8.464-0.088-0.040-0.174-0.084-0.262-0.122-0.994-0.418-2.006-0.774-3.024-1.108-0.242-0.080-0.474-0.176-0.72-0.252-0.942-0.288-1.894-0.516-2.854-0.732-0.334-0.076-0.658-0.176-0.996-0.244-0.998-0.2-2.004-0.336-3.010-0.458-0.306-0.038-0.606-0.1-0.912-0.13-1.322-0.13-2.65-0.204-3.976-0.204h-391.784c-1.754 0-3.468 0.152-5.162 0.372-19.646 2.538-34.838 19.29-34.838 39.628v145.516h-279.874c-1.754 0-3.468 0.152-5.162 0.372-19.646 2.538-34.838 19.29-34.838 39.628v628.28c0 22.094 17.91 40 40 40h496.118c13.808 0 25.98-6.996 33.168-17.636 0.102-0.148 2.084-3.466 2.128-3.548 2.992-5.612 4.704-12.010 4.704-18.808 0 0 0 0 0-0.004v-145.518h279.874c13.808 0 25.98-6.996 33.168-17.636 0.102-0.148 2.084-3.466 2.128-3.548 2.992-5.612 4.704-12.010 4.704-18.808 0 0 0 0 0-0.004v-521.828c0.008-0.23-0.016-0.458-0.014-0.688 0.002-0.202 0.028-0.39 0.028-0.584zM144.124 878.792v-548.278h311.752v65.186c0 22.090 17.91 40 40 40h64.366v443.092h-416.118zM640.244 693.278v-296.31c0.006-0.23-0.018-0.458-0.014-0.688 0.004-0.196 0.030-0.382 0.030-0.578 0-0.444-0.052-0.874-0.066-1.312-0.024-0.684-0.044-1.366-0.104-2.046-0.062-0.74-0.16-1.468-0.262-2.198-0.078-0.564-0.152-1.128-0.258-1.692-0.144-0.792-0.324-1.566-0.516-2.34-0.124-0.508-0.246-1.014-0.39-1.518-0.226-0.784-0.488-1.548-0.76-2.312-0.174-0.49-0.342-0.98-0.538-1.466-0.302-0.754-0.64-1.486-0.988-2.216-0.222-0.472-0.438-0.946-0.68-1.41-0.398-0.762-0.838-1.496-1.284-2.228-0.242-0.396-0.466-0.798-0.724-1.19-0.606-0.924-1.262-1.81-1.942-2.678-0.13-0.168-0.246-0.346-0.382-0.512-0.978-1.212-2.028-2.364-3.138-3.454l-104.020-104.9c-3.714-3.714-7.988-6.518-12.542-8.464-0.088-0.040-0.172-0.084-0.262-0.122-0.994-0.418-2.004-0.774-3.024-1.108-0.242-0.080-0.476-0.176-0.72-0.252-0.942-0.288-1.896-0.516-2.854-0.732-0.334-0.076-0.658-0.176-0.996-0.244-0.998-0.2-2.004-0.336-3.012-0.458-0.304-0.038-0.602-0.1-0.91-0.13-1.322-0.13-2.648-0.204-3.976-0.204h-31.916v-105.516h311.752v65.186c0 22.090 17.91 40 40 40h64.366v443.092h-239.87z"></path></svg>
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	shapes: state.shapes,
	config: state.config
});

export default connect(
	mapStateToProps,
	{ setShapes, updateDesignTemplate }
)(ToolBar);