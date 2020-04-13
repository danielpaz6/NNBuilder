export interface IDraggableSVGState {
	x: number;
	y: number;
	active: boolean;
	offset: {
		x: number;
		y: number;
	}
}

export interface IDraggable {
	handlePointerDown: (e : React.PointerEvent<EventTarget>) => void;
	handlePointerMove: (e : React.PointerEvent<EventTarget>) => void;
	handlePointerUp: () => void;
}

export interface IDraggableShape extends IDraggableSVGState, IDraggable {};