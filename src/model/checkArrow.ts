import { Shape } from "../store/shapes/types"
import { addToast } from "../store/toasts/actions"
import { ArrowMap } from "../interfaces/arrowmap"
import Input from "../components/DiagramContainer/Shapes/Input";

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

	return true;
}