import MaxPooling from "../components/DiagramContainer/Shapes/MaxPooling";
import FullyConnected from "../components/DiagramContainer/Shapes/FullyConnected";
import Flatten from "../components/DiagramContainer/Shapes/Flatten";
import Convolutional from "../components/DiagramContainer/Shapes/Convolutional";
import Addition from "../components/DiagramContainer/Shapes/Addition";
import Concatenate from "../components/DiagramContainer/Shapes/Concatenate";

export interface IDraggableSVGState {
	x: number;
	y: number;
	historyX: number;
	historyY: number;
	currentMove: boolean;
	offset: {
		x: number;
		y: number;
	}
}

export interface IDraggable {
	handlePointerDown: (e : React.PointerEvent<EventTarget>) => void;
	handlePointerMove: (e : React.PointerEvent<EventTarget>) => void;
	handlePointerUp: () => void;
	active: boolean;
}

export interface IDraggableShape extends IDraggableSVGState, IDraggable {};

export abstract class ShapeCenterPosition {
	static constX : number;
	static constY : number;
}

export type LayerTypes =
	typeof MaxPooling |
	typeof FullyConnected |
	typeof Flatten |
	typeof Convolutional |
	typeof Concatenate |
	typeof Addition;

export const layersMap : Record<string, {create: () => LayerTypes, centerPosition: number[]}> = {
	MaxPooling: {
		create: () => MaxPooling,
		centerPosition: MaxPooling.centerPosition
	},
	FullyConnected: {
		create: () => FullyConnected,
		centerPosition: FullyConnected.centerPosition
	},
	Flatten: {
		create: () => Flatten,
		centerPosition: Flatten.centerPosition
	},
	Convolutional: {
		create: () => Convolutional,
		centerPosition: Convolutional.centerPosition
	},
	Concatenate: {
		create: () => Concatenate,
		centerPosition: Concatenate.centerPosition
	},
	Addition: {
		create: () => Addition,
		centerPosition: Addition.centerPosition
	}
}