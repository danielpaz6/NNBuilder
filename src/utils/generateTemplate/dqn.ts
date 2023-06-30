import { layersMap } from "../../interfaces/shapes";
import { Shape } from "../../interfaces/IShape";
import { TEMPLATE_ABSTRACT } from "../../interfaces/designTemplates";
import FullyConnected from "../../components/DiagramContainer/Shapes/FullyConnected";
import ArrowMap from "../../interfaces/arrowmap";
import { ACTIVATION_NONE, ACTIVATION_RELU } from "../../interfaces/activations";

const time = new Date().getTime() - 3000;

const input : Shape = {
	name: "Input",
	timestamp: time - 1,
	shape: layersMap.Input.create(),
	x: 15,
	y: 185,
	centerPosition: layersMap.Input.centerPosition,
	additionalInfo: {
		...layersMap.Input.additionalInfo,
		type: "Image",
		dimension: "3D",
		dim1: 84,
		dim2: 84,
		dim3: 4
	}
};

const conv1 : Shape = {
	name: "Convolutional",
	timestamp: time - 2,
	shape: layersMap.Convolutional.create(),
	x: 192,
	y: 168,
	centerPosition: layersMap.Convolutional.centerPosition,
	additionalInfo: {
		...layersMap.Convolutional.additionalInfo,
		inChannels: 4,
		outChannels: 32,
		kernelSize: 8,
		stride: 4
	}
};

const conv2 : Shape = {
	name: "Convolutional",
	timestamp: time - 3,
	shape: layersMap.Convolutional.create(),
	x: 446,
	y: 167,
	centerPosition: layersMap.Convolutional.centerPosition,
	additionalInfo: {
		...layersMap.Convolutional.additionalInfo,
		inChannels: 32,
		outChannels: 64,
		kernelSize: 4,
		stride: 2
	}
};

const conv3 : Shape = {
	name: "Convolutional",
	timestamp: time - 4,
	shape: layersMap.Convolutional.create(),
	x: 704,
	y: 167,
	centerPosition: layersMap.Convolutional.centerPosition,
	additionalInfo: {
		...layersMap.Convolutional.additionalInfo,
		inChannels: 64,
		outChannels: 64,
		kernelSize: 3,
		stride: 1
	}
};

const flatten : Shape = {
	name: "Flatten",
	timestamp: time - 5,
	shape: layersMap.Flatten.create(),
	x: 910,
	y: 135,
	centerPosition: layersMap.Flatten.centerPosition,
	additionalInfo: {...layersMap.Flatten.additionalInfo}
};

const fc1 : Shape = {
	name: "FullyConnected",
	timestamp: time - 6,
	shape: layersMap.FullyConnected.create(),
	x: 1030,
	y: 123,
	centerPosition: layersMap.FullyConnected.centerPosition,
	additionalInfo: {
		...layersMap.FullyConnected.additionalInfo,
		inputDimension: 3136,
		outputDimension: 512,
		nodesCount: 7
	}
};

const fc2 : Shape = {
	name: "FullyConnected",
	timestamp: time - 7,
	shape: layersMap.FullyConnected.create(),
	x: 1165,
	y: 157,
	centerPosition: {
		...layersMap.FullyConnected.centerPosition,
		[TEMPLATE_ABSTRACT]: FullyConnected.centerPositionAbstract(5)
	},
	additionalInfo: {
		...layersMap.FullyConnected.additionalInfo, 
		inputDimension: 512,
		outputDimension: 6,
		nodesCount: 5
	}
};

const output : Shape = {
	name: "Output",
	timestamp: time - 8,
	shape: layersMap.Output.create(),
	x: 1268,
	y: 87,
	centerPosition: layersMap.Output.centerPosition,
	additionalInfo: {...layersMap.Output.additionalInfo}
};


export const arrows = new ArrowMap();
arrows.set([input, conv1], ACTIVATION_NONE);
arrows.set([conv1, conv2], ACTIVATION_RELU);
arrows.set([conv2, conv3], ACTIVATION_RELU);
arrows.set([conv3, flatten], ACTIVATION_NONE);
arrows.set([flatten, fc1], ACTIVATION_RELU);
arrows.set([fc1, fc2], ACTIVATION_RELU);
arrows.set([fc2, output], ACTIVATION_NONE);

export const inputs = [input, conv1, conv2, conv3, flatten, fc1, fc2, output];