import { addToast } from "../store/toasts/actions";
import ArrowMap from "../interfaces/arrowmap";
import Input from "../components/DiagramContainer/Shapes/Input";
import Output from "../components/DiagramContainer/Shapes/Output";
import Concatenate from "../components/DiagramContainer/Shapes/Concatenate";
import Addition from "../components/DiagramContainer/Shapes/Addition";
import { Shape } from "../interfaces/IShape";

export const isValidArrow = (
	sourceShape: Shape,
	targetShape: Shape, 
	arrows: ArrowMap,
	addNotifcation: typeof addToast) : boolean =>
{
	
	// Check if there is opposite arrow already
	if(arrows.has([targetShape, sourceShape])) {
		addNotifcation("Illegal Arrow Drawing", `Cannot draw bidirectional arrow. 
		Seems like you already have an arrow on the opposite side.`);
		return false;
	}

	// Note: targetShape.shape is not a new instance of Input for example, but the class Input itself.
	// Hence, it won't be true to check if it's "instanceof" Input, but equals.
	if(targetShape.shape === Input) {
		addNotifcation("Illegal Arrow Drawing", `Cannot draw arrow to Input layer.`);
		return false;
	}

	// No more than one arrow can be connected to a Shape except Concat and Add.
	if(
		targetShape.shape !== Concatenate &&
		targetShape.shape !== Addition &&
		arrows.getConnectedToMeCount(targetShape) > 0) {
		
			addNotifcation("Illegal Arrow Drawing", `Please use Concatenate or Addition layer if you 
		want to multiple arrows to the same layer.`);
		return false;
	}

	if(sourceShape.shape === Output) {
		addNotifcation("Illegal Arrow Drawing", `Cannot draw arrows from Output layer.`);
		return false;
	}

	return true;
}