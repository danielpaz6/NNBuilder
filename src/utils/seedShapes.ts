import { Shape } from "../store/shapes/types";
import { layersMap } from '../interfaces/shapes';

const fc1 : Shape = {
	name: "FullyConnected",
	timestamp: new Date().getTime() - 100,
	shape: layersMap.FullyConnected.create(),
	x: 83,
	y: 70,
	centerPosition: layersMap.FullyConnected.centerPosition,
	connectedTo: [],
	connectedToMe: []
};

const fc2 : Shape = {
	name: "FullyConnected",
	timestamp: new Date().getTime() - 200,
	shape: layersMap.FullyConnected.create(),
	x: 83,
	y: 230,
	centerPosition: layersMap.FullyConnected.centerPosition,
	connectedTo: [],
	connectedToMe: []
};

const fc3 : Shape = {
	name: "FullyConnected",
	timestamp: new Date().getTime() - 300,
	shape: layersMap.FullyConnected.create(),
	x: 203,
	y: 70,
	centerPosition: layersMap.FullyConnected.centerPosition,
	connectedTo: [],
	connectedToMe: []
};

const fc4 : Shape = {
	name: "FullyConnected",
	timestamp: new Date().getTime() - 400,
	shape: layersMap.FullyConnected.create(),
	x: 203,
	y: 230,
	centerPosition: layersMap.FullyConnected.centerPosition,
	connectedTo: [],
	connectedToMe: []
}

const fc5 : Shape = {
	name: "FullyConnected",
	timestamp: new Date().getTime() - 500,
	shape: layersMap.FullyConnected.create(),
	x: 443,
	y: 155,
	centerPosition: layersMap.FullyConnected.centerPosition,
	connectedTo: [],
	connectedToMe: []
}

const concat : Shape = {
	name: "Concatenate",
	timestamp: new Date().getTime() - 600,
	shape: layersMap.Concatenate.create(),
	x: 328,
	y: 140,
	centerPosition: layersMap.Concatenate.centerPosition,
	connectedTo: [],
	connectedToMe: []
}

// Make connections between the shapes
fc1.connectedTo.push(fc3);
fc3.connectedToMe.push(fc1);

fc2.connectedTo.push(fc4);
fc4.connectedToMe.push(fc2);

fc3.connectedTo.push(concat);
fc4.connectedTo.push(concat);

concat.connectedToMe.push(fc3, fc4);

concat.connectedTo.push(fc5);
fc3.connectedToMe.push(concat);



export const seedInitShapes : Shape[] = [fc1, fc2, fc3, fc4, concat, fc5];