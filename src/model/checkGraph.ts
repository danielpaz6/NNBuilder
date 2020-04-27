import { Shape } from "../store/shapes/types";
import ArrowMap from "../interfaces/arrowMap";
import { addToast } from "../store/toasts/actions";


/**
 * Kahn's Alogirthm
 * https://dl.acm.org/doi/10.1145/368996.369025
 * More readable alogirthm source:
 * https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm
 * 
 * @param vertexes - List of all vertexes 
 * @param arrowsMap - List of all edges
 * @param addNotifcation - a function to display errors
 */
export const topologicalSort = (
	vertexes: Shape[], 
	arrowsMap: ArrowMap, 
	addNotifcation: typeof addToast) =>
{
	/*if(!arrowsMap.getConnectedToMe(OutputShape))
	{
		addNotifcation("Interpretation Error", `The Output layer must be
		connected to at least one layer.`);
		return;
	}*/

	// Copy of the Arrow Map ( so we could delete edges and vertexes )
	const arrows = new ArrowMap(arrowsMap);

	// Empty list that will contain the sorted elements
	const L: Shape[] = [];
	
	// Set of all nodes with no incoming edge
	const S: Shape[] = [];

	for(const vertex of vertexes) {
		// If vertex has no incoming edges:
		if(arrows.getConnectedToMeCount(vertex) === 0) {
			S.push(vertex);
		}
	}

	// While s is non-empty do
	while(S.length > 0) {
		// Remove a node n from S
		const node: Shape = S.pop()!;

		// Add n to tail of L
		L.push(node);

		// For each node m with an edge e from n to m do
		if(arrows.getConnectedToCount(node) > 0) {
			for(const m of arrows.getConnectedTo(node)!) {
				// Remove edge e from the graph
				arrows.deleteArrow([node, m]);

				// If m has no other incoming edges then
				if(arrows.getConnectedToMeCount(m) === 0)
					S.push(m);
			}
		}
	}

	// If graph has edges then
	if(arrows.size > 0) {
		addNotifcation("Interpretation Error", `Cannot have cycles in your model.`);
		return;
	}

	// A topologically sorted order
	return L;
}