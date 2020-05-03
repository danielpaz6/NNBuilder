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
import { TEMPLATE_FILLED, TEMPLATE_ABSTRACT } from "./designTemplates";

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
	centerPosition: Record<string, number[]>;
	additionalInfo?: Record<string, AdditionalInformationType>;
}

export const layersMap : Record<string, LayerInformation> = {
	MaxPooling: {
		create: () => MaxPooling,
		centerPosition: {
			[TEMPLATE_FILLED]: MaxPooling.centerPosition
		}
	},
	FullyConnected: {
		create: () => FullyConnected,
		centerPosition: {
			[TEMPLATE_FILLED]: FullyConnected.centerPosition,
			[TEMPLATE_ABSTRACT]: FullyConnected.centerPositionAbstract
		},
		additionalInfo: {
			inputDimension: 32,
			outputDimension: 32,
			nodesCount: 7
		}
	},
	Flatten: {
		create: () => Flatten,
		centerPosition: {
			[TEMPLATE_FILLED]: Flatten.centerPosition
		}
	},
	Convolutional: {
		create: () => Convolutional,
		centerPosition: {
			[TEMPLATE_FILLED]: Convolutional.centerPosition,
			[TEMPLATE_ABSTRACT]: Convolutional.centerPositionAbstract
		},
		additionalInfo: {
			inChannels: 0,
			outChannels: 0,
			kernelSize: 1,
			stride: 1
		}
	},
	Concatenate: {
		create: () => Concatenate,
		centerPosition: {
			[TEMPLATE_FILLED]: Concatenate.centerPosition,
			[TEMPLATE_ABSTRACT]: Concatenate.centerPositionAbstract
		}
	},
	Addition: {
		create: () => Addition,
		centerPosition: {
			[TEMPLATE_FILLED]: Addition.centerPosition,
			[TEMPLATE_ABSTRACT]: Addition.centerPositionAbstract
		}
	},
	Input: {
		create: () => Input,
		centerPosition: {
			[TEMPLATE_FILLED]: Input.centerPosition,
			[TEMPLATE_ABSTRACT]: Input.centerPositionAbstract
		}
	},
	Output: {
		create: () => Output,
		centerPosition: {
			[TEMPLATE_FILLED]: Output.centerPosition,
			[TEMPLATE_ABSTRACT]: Output.centerPositionAbstract
		}
	},
	Dropout: {
		create: () => Dropout,
		centerPosition: {
			[TEMPLATE_FILLED]: Dropout.centerPosition,
			[TEMPLATE_ABSTRACT]: Dropout.centerPositionAbstract
		}
	},
	BatchNormalization: {
		create: () => BatchNormalization,
		centerPosition: {
			[TEMPLATE_FILLED]: BatchNormalization.centerPosition,
			[TEMPLATE_ABSTRACT]: BatchNormalization.centerPositionAbstract
		}
	}
}