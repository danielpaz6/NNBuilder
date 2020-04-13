import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import * as d3drag from "d3-drag";

export interface IRectProps {
	id: string;
}

export const Rect = (props: IRectProps) => {

	const [position, setPosition] = React.useState({
		x: 100,
		y: 100,
		active: false,
		offset: {
			x: 0,
			y: 0
		}
	});

	const handlePointerDown = (e : React.PointerEvent<EventTarget>) => {
		const el = e.target as HTMLInputElement;
		const bbox = el.getBoundingClientRect();
		const x = e.clientX - bbox.left;
		const y = e.clientY - bbox.top;
		el.setPointerCapture(e.pointerId);
		setPosition({
		  ...position,
		  active: true,
		  offset: {
			x,
			y
		  }
		});
	  };

	  const handlePointerMove = (e: React.PointerEvent<EventTarget>) => {
		const el = e.target as HTMLInputElement;
		const bbox = el.getBoundingClientRect();
		const x = e.clientX - bbox.left;
		const y = e.clientY - bbox.top;

		const newX = position.x - (position.offset.x - x);
		const newY = position.y - (position.offset.y - y);

		if (position.active) {
		  setPosition({
			...position,
			x: newX < 0 ? 0 : newX,
			y: newY < 0 ? 0 : newY
		  });
		}
	  };

	  const handlePointerUp = () => {
		setPosition({
		  ...position,
		  active: false
		});
	  };
	
	//console.log("Render: " + props.id);

	return (
		<circle
		  cx={position.x}
		  cy={position.y}
		  r={50}
		  onPointerDown={handlePointerDown}
		  onPointerUp={handlePointerUp}
		  onPointerMove={handlePointerMove}
		  fill={position.active ? "blue" : "black"}
		/>
	  );
}

export default Rect;