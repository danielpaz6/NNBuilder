import { LayerTypes } from "./shapes";

// Describing the shape of the shapes's slice of state
export interface Shape {
	name: string;
	timestamp: number;
	shape: LayerTypes;
	x: number;
	y: number;
	centerPosition: number[]; // X and Y locations relative to the top left edge of the shape
	//associatedArrows: Arrow[]; // include both connected to and connectedToMe
	//connectedTo: Shape[]; // pointers to the real shapes
	//connectedToMe: Shape[]; // pointers to the real shapes
	description?: string;
	additionalInfo?: Record<string, AdditionalInformationType>;
	//active: boolean;
}

export type AdditionalInformationType = string | number;