import { layersMap } from '../interfaces/shapes';
import { AllActivationFunctions, ACTIVATION_NONE } from "../interfaces/activations";
import { Shape } from '../interfaces/IShape';

const fc1 : Shape = {
	name: "Input",
	timestamp: new Date().getTime() - 100,
	shape: layersMap.Input.create(),
	x: 83,
	y: 70,
	centerPosition: layersMap.Input.centerPosition,
	additionalInfo: {...layersMap.Input.additionalInfo}
	////connectedTo: [],
	////connectedToMe: []
};

const fc2 : Shape = {
	name: "FullyConnected",
	timestamp: new Date().getTime() - 200,
	shape: layersMap.FullyConnected.create(),
	x: 83,
	y: 230,
	centerPosition: layersMap.FullyConnected.centerPosition,
	additionalInfo: {...layersMap.FullyConnected.additionalInfo}
	//connectedTo: [],
	//connectedToMe: []
};

const fc3 : Shape = {
	name: "FullyConnected",
	timestamp: new Date().getTime() - 300,
	shape: layersMap.FullyConnected.create(),
	x: 203,
	y: 70,
	centerPosition: layersMap.FullyConnected.centerPosition,
	additionalInfo: {...layersMap.FullyConnected.additionalInfo}
	//connectedTo: [],
	//connectedToMe: []
};

const fc4 : Shape = {
	name: "FullyConnected",
	timestamp: new Date().getTime() - 400,
	shape: layersMap.FullyConnected.create(),
	x: 203,
	y: 230,
	centerPosition: layersMap.FullyConnected.centerPosition,
	additionalInfo: {...layersMap.FullyConnected.additionalInfo}
	//connectedTo: [],
	//connectedToMe: []
}

const fc5 : Shape = {
	name: "FullyConnected",
	timestamp: new Date().getTime() - 500,
	shape: layersMap.FullyConnected.create(),
	x: 443,
	y: 155,
	centerPosition: layersMap.FullyConnected.centerPosition,
	additionalInfo: {...layersMap.FullyConnected.additionalInfo}
	//connectedTo: [],
	//connectedToMe: []
}

const concat : Shape = {
	name: "Concatenate",
	timestamp: new Date().getTime() - 600,
	shape: layersMap.Concatenate.create(),
	x: 328,
	y: 140,
	centerPosition: layersMap.Concatenate.centerPosition,
	additionalInfo: {...layersMap.Concatenate.additionalInfo}
	//connectedTo: [],
	//connectedToMe: []
}

const output : Shape = {
	name: "Output",
	timestamp: new Date().getTime() - 700,
	shape: layersMap.Output.create(),
	x: 543,
	y: 155,
	centerPosition: layersMap.Output.centerPosition,
	additionalInfo: {...layersMap.Output.additionalInfo}
	//connectedTo: [],
	//connectedToMe: []
}

// Make connections between the shapes

const arrows = new Map<[Shape, Shape], AllActivationFunctions>();
arrows.set([fc1, fc3], ACTIVATION_NONE);
arrows.set([fc2, fc4], ACTIVATION_NONE);
arrows.set([fc3, fc4], ACTIVATION_NONE);
arrows.set([concat, fc3], ACTIVATION_NONE);
arrows.set([concat, fc4], ACTIVATION_NONE);

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
	//connectedTo: [],
	//connectedToMe: []
};

export const seedInitArrorws = arrows;
export const seedInitShapes : Shape[] = [fc1, fc2, fc3, fc4, concat, fc5, output];
export const seedNewShapes : Shape[] = [newInput, newOutput];