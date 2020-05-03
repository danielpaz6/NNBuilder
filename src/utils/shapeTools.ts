import { Shape } from "../interfaces/IShape"

/**
 * This function traverse the shape list and set the `centerPosition` for each shape.
 * @param shapes - List of all shapes/layers
 * @param centerPosition - a center position that will be set to every shape
 * 
 * @returns void, it sets the shapes given argument
 */
export const setCenterPosition = (shapes: Shape[], centerPosition: Record<string, number[]>) => {
	for(let i = 0; i < shapes.length; i++) {
		shapes[i].centerPosition = centerPosition;
	}
}