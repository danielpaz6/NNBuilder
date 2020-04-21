import { Shape } from "../../store/shapes/types";
import { layersMap } from "../../interfaces/shapes";

const time = new Date().getTime() - 2000;

const input : Shape = {
	name: "Input",
	timestamp: time - 1,
	shape: layersMap.Input.create(),
	x: 55,
	y: 218,
	centerPosition: layersMap.Input.centerPosition,
	//connectedTo: [],
	//connectedToMe: []
};

const fc1 : Shape = {
	name: "FullyConnected",
	timestamp: time - 2,
	shape: layersMap.FullyConnected.create(),
	x: 168,
	y: 83,
	centerPosition: layersMap.FullyConnected.centerPosition,
	//connectedTo: [],
	//connectedToMe: []
};

const fc2 : Shape = {
	name: "FullyConnected",
	timestamp: time - 3,
	shape: layersMap.FullyConnected.create(),
	x: 373,
	y: 83,
	centerPosition: layersMap.FullyConnected.centerPosition,
	//connectedTo: [],
	//connectedToMe: []
};

const norm1 : Shape = {
	name: "BatchNormalization",
	timestamp: time - 4,
	shape: layersMap.BatchNormalization.create(),
	x: 261,
	y: 103,
	centerPosition: layersMap.BatchNormalization.centerPosition,
	//connectedTo: [],
	//connectedToMe: []
};

const norm2 : Shape = {
	name: "BatchNormalization",
	timestamp: time - 5,
	shape: layersMap.BatchNormalization.create(),
	x: 453,
	y: 103,
	centerPosition: layersMap.BatchNormalization.centerPosition,
	//connectedTo: [],
	//connectedToMe: []
};

const add : Shape = {
	name: "Addition",
	timestamp: time - 6,
	shape: layersMap.Addition.create(),
	x: 453,
	y: 214,
	centerPosition: layersMap.Addition.centerPosition,
	//connectedTo: [],
	//connectedToMe: []
};

const output : Shape = {
	name: "Output",
	timestamp: time - 7,
	shape: layersMap.Output.create(),
	x: 627,
	y: 194,
	centerPosition: layersMap.Output.centerPosition,
	//connectedTo: [],
	//connectedToMe: []
};

/*
input.connectedTo.push(fc1,add);
fc1.connectedToMe.push(input);
fc1.connectedTo.push(norm1);
norm1.connectedToMe.push(fc1);
norm1.connectedTo.push(fc2);
fc2.connectedToMe.push(norm1);
fc2.connectedTo.push(norm2);
norm2.connectedToMe.push(fc2);
norm2.connectedTo.push(add);
add.connectedToMe.push(norm2,input);
add.connectedTo.push(output);
*/

export default [input, fc1, norm1, fc2, norm2, add, output];