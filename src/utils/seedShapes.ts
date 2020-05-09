import { layersMap } from '../interfaces/shapes';
import { AllActivationFunctions, ACTIVATION_NONE, ACTIVATION_RELU, ACTIVATION_SIGMOID } from "../interfaces/activations";
import { Shape } from '../interfaces/IShape';
import ArrowMap from '../interfaces/arrowMap';
import { TEMPLATE_ABSTRACT } from '../interfaces/designTemplates';
import FullyConnected from '../components/DiagramContainer/Shapes/FullyConnected';

const input : Shape = {
	name: "Input",
	timestamp: new Date().getTime() - 100,
	shape: layersMap.Input.create(),
	x: 21,
	y: 202,
	centerPosition: layersMap.Input.centerPosition,
	additionalInfo: {...layersMap.Input.additionalInfo}
	////connectedTo: [],
	////connectedToMe: []
};

const fc1 : Shape = {
	name: "FullyConnected",
	timestamp: new Date().getTime() - 200,
	shape: layersMap.FullyConnected.create(),
	x: 214,
	y: 14,
	centerPosition: layersMap.FullyConnected.centerPosition,
	additionalInfo: {...layersMap.FullyConnected.additionalInfo}
	//connectedTo: [],
	//connectedToMe: []
};

const fc2 : Shape = {
	name: "FullyConnected",
	timestamp: new Date().getTime() - 300,
	shape: layersMap.FullyConnected.create(),
	x: 335,
	y: 14,
	centerPosition: layersMap.FullyConnected.centerPosition,
	additionalInfo: {...layersMap.FullyConnected.additionalInfo}
	//connectedTo: [],
	//connectedToMe: []
};

const fc3 : Shape = {
	name: "FullyConnected",
	timestamp: new Date().getTime() - 400,
	shape: layersMap.FullyConnected.create(),
	x: 214,
	y: 307,
	centerPosition: {
		...layersMap.FullyConnected.centerPosition,
		[TEMPLATE_ABSTRACT]: FullyConnected.centerPositionAbstract(5)
	},
	additionalInfo: {...layersMap.FullyConnected.additionalInfo, nodesCount: 5}
	//connectedTo: [],
	//connectedToMe: []
}

const fc4 : Shape = {
	name: "FullyConnected",
	timestamp: new Date().getTime() - 500,
	shape: layersMap.FullyConnected.create(),
	x: 584,
	y: 145,
	centerPosition: layersMap.FullyConnected.centerPosition,
	additionalInfo: {...layersMap.FullyConnected.additionalInfo}
	//connectedTo: [],
	//connectedToMe: []
}

const fc5 : Shape = {
	name: "FullyConnected",
	timestamp: new Date().getTime() - 510,
	shape: layersMap.FullyConnected.create(),
	x: 702,
	y: 176,
	centerPosition: {
		...layersMap.FullyConnected.centerPosition,
		[TEMPLATE_ABSTRACT]: FullyConnected.centerPositionAbstract(5)
	},
	additionalInfo: {...layersMap.FullyConnected.additionalInfo, nodesCount: 5}
	//connectedTo: [],
	//connectedToMe: []
}

const dropout : Shape = {
	name: "Dropout",
	timestamp: new Date().getTime() - 610,
	shape: layersMap.Dropout.create(),
	x: 315,
	y: 352,
	centerPosition: layersMap.Dropout.centerPosition,
	additionalInfo: {...layersMap.Dropout.additionalInfo}
	//connectedTo: [],
	//connectedToMe: []
}

const concat : Shape = {
	name: "Concatenate",
	timestamp: new Date().getTime() - 600,
	shape: layersMap.Concatenate.create(),
	x: 460,
	y: 222,
	centerPosition: layersMap.Concatenate.centerPosition,
	additionalInfo: {...layersMap.Concatenate.additionalInfo}
	//connectedTo: [],
	//connectedToMe: []
}

const output : Shape = {
	name: "Output",
	timestamp: new Date().getTime() - 700,
	shape: layersMap.Output.create(),
	x: 800,
	y: 106,
	centerPosition: layersMap.Output.centerPosition,
	additionalInfo: {...layersMap.Output.additionalInfo}
	//connectedTo: [],
	//connectedToMe: []
}

// Make connections between the shapes

const arrows = new ArrowMap();
arrows.set([input, fc1], ACTIVATION_RELU);
arrows.set([input, fc3], ACTIVATION_SIGMOID);
arrows.set([fc1, fc2], ACTIVATION_NONE);
arrows.set([fc3, dropout], ACTIVATION_NONE);
arrows.set([fc2, concat], ACTIVATION_RELU);
arrows.set([dropout, concat], ACTIVATION_NONE);
arrows.set([concat, fc4], ACTIVATION_NONE);
arrows.set([fc4, fc5], ACTIVATION_RELU);
arrows.set([fc5, output], ACTIVATION_NONE);

/*
fc1.connectedTo.push(fc3);
fc3.connectedToMe.push(fc1);

fc2.connectedTo.push(fc4);
fc4.connectedToMe.push(fc2);

fc3.connectedTo.push(concat);
fc4.connectedTo.push(concat);

concat.connectedToMe.push(fc3, fc4);

concat.connectedTo.push(fc5);
fc3.connectedToMe.push(concat);

fc5.connectedTo.push(output);
output.connectedToMe.push(fc5);
*/

const newInput: Shape = {
	name: "Input",
	timestamp: new Date().getTime() - 1000,
	shape: layersMap.Input.create(),
	x: 57,
	y: 180,
	centerPosition: layersMap.Input.centerPosition,
	additionalInfo: {...layersMap.Input.additionalInfo}
	//connectedTo: [],
	//connectedToMe: []
};

const newOutput: Shape = {
	name: "Output",
	timestamp: new Date().getTime() - 1100,
	shape: layersMap.Output.create(),
	x: 587,
	y: 155,
	centerPosition: layersMap.Output.centerPosition,
	additionalInfo: {...layersMap.Output.additionalInfo}
	//connectedTo: [],
	//connectedToMe: []
};

export const seedInitArrorws = arrows;
export const seedInitShapes : Shape[] = [input, fc1, fc2, fc3, fc4, concat, fc5, dropout, output];
export const seedNewShapes : Shape[] = [newInput, newOutput];