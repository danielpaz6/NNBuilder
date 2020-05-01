import { topologicalSort, BFSAncestorsCount } from "./graphAlgorithms";
import { generateFullPyTorchCode } from "./generateCode/pytorch";
import { Shape } from "../store/shapes/types";
import { addToast } from "../store/toasts/actions";
import ArrowMap from "../interfaces/arrowMap";
import { CodeTypes, PYTORCH_CODE } from "./generateCode/types";
import Input from "../components/DiagramContainer/Shapes/Input";

/**
 * All the model logic of creating code and creating errors
 * 
 * @param vertexes - All Layers list
 * @param arrowsMap - All Arrows
 * @param addNotifcation - A function to make error notifications
 * 
 * @return A code hashmap or empty hashmap
 */

export const generateGraphCodeableWithErrors = (
	vertexes: Shape[], 
	arrowsMap: ArrowMap, 
	addNotifcation: typeof addToast
) : Map<CodeTypes, string> => {
	
	// The final output
	const codedMap = new Map<CodeTypes, string>();

	if(vertexes.length == 0 || vertexes[0].shape !== Input) {
		addNotifcation("Generate Code Error", `Cannot generate code if the 
		first layer is not an Input layter.`);

		return codedMap;
	}

	const bfsCount = BFSAncestorsCount(vertexes[0], arrowsMap);
	
	if(bfsCount !== vertexes.length) {
		addNotifcation("Generate Code Error", `All layers must be ancestors of the Input layer.`);

		return codedMap;
	}

	// TopologicalSort already prints error if exists.
	const shapes = topologicalSort(vertexes, arrowsMap, addNotifcation);
	if(!shapes || shapes.length == 0) {
		return codedMap;
	}

	codedMap.set(
		PYTORCH_CODE, 
		generateFullPyTorchCode(shapes, arrowsMap)
	);

	return codedMap;
}