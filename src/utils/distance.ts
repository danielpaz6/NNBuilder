export const manhattanDistance = (x1: number, y1: number, x2: number, y2: number) => {
	return x1-x2 + y1-y2;
}

/**
 * A function that calculate the point fixed distance from certain mid point
 * 
 * @param d - Distance from mid point
 * @param xMid - x mid point
 * @param yMid - y mid point
 * @param x2  - x of the target shape
 * @param y2 - y of the target shape
 * 
 * @returns [X, Y] fixed point
 */
export const fixedDistanceFromPolygon = (d: number, xMid: number, yMid: number, x2: number, y2: number, oppositeSide = false) => {
	let xText, yText;

	const m = -1 * (yMid-y2) / (xMid-x2);

	if(m < 0 && oppositeSide === true) {
		d *= -1;
	}

	const alpha = Math.atan(m);
	const A = d * Math.sin(alpha);
	
	//const b = (1/m * xMid + y1);
	
	xText = A + xMid;
	xText += 5; // fixed size
	yText = yMid + d * Math.cos(alpha);

	return [xText, yText];
}