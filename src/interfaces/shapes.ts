import MaxPooling from "../components/DiagramContainer/Shapes/MaxPooling";
import FullyConnected from "../components/DiagramContainer/Shapes/FullyConnected";
import Flatten from "../components/DiagramContainer/Shapes/Flatten";
import Convolutional from "../components/DiagramContainer/Shapes/Convolutional";
import Addition from "../components/DiagramContainer/Shapes/Addition";
import Concatenate from "../components/DiagramContainer/Shapes/Concatenate";
import Input from "../components/DiagramContainer/Shapes/Input";
import Output from "../components/DiagramContainer/Shapes/Output";
import Dropout from "../components/DiagramContainer/Shapes/Dropout";
import BatchNormalization from "../components/DiagramContainer/Shapes/BatchNormalization";
import { AdditionalInformationType } from "./IShape";

export interface IDraggableSVGState {
	isMarked: boolean;
}

export interface IDraggable {
	handlePointerDown: (e : React.PointerEvent<EventTarget>) => void;
	handlePointerMove: (e : React.PointerEvent<EventTarget>) => void;
	handlePointerUp: () => void;
	active: boolean;
}

export interface IDraggableShape extends IDraggableSVGState {};

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
	typeof Addition |
	typeof Input |
	typeof Output |
	typeof Dropout |
	typeof BatchNormalization;

export interface LayerInformation {
	create: () => LayerTypes;
	centerPosition: number[];
	additionalInfo?: Record<string, AdditionalInformationType>;
}

export const layersMap : Record<string, LayerInformation> = {
	MaxPooling: {
		create: () => MaxPooling,
		centerPosition: MaxPooling.centerPosition
	},
	FullyConnected: {
		create: () => FullyConnected,
		centerPosition: FullyConnected.centerPosition,
		additionalInfo: {
			inputDimension: 32,
			outputDimension: 32,
			nodesCount: 7
		}
	},
	Flatten: {
		create: () => Flatten,
		centerPosition: Flatten.centerPosition
	},
	Convolutional: {
		create: () => Convolutional,
		centerPosition: Convolutional.centerPosition,
		additionalInfo: {
			inChannels: 0,
			outChannels: 0,
			kernelSize: 1,
			stride: 1
		}
	},
	Concatenate: {
		create: () => Concatenate,
		centerPosition: Concatenate.centerPosition
	},
	Addition: {
		create: () => Addition,
		centerPosition: Addition.centerPosition
	},
	Input: {
		create: () => Input,
		centerPosition: Input.centerPosition
	},
	Output: {
		create: () => Output,
		centerPosition: Output.centerPosition
	},
	Dropout: {
		create: () => Dropout,
		centerPosition: Dropout.centerPosition
	},
	BatchNormalization: {
		create: () => BatchNormalization,
		centerPosition: BatchNormalization.centerPosition
	}
}