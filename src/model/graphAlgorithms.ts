import ArrowMap from "../interfaces/arrowmap";
import { addToast } from "../store/toasts/actions";
import { Queue } from "../interfaces/queue";
import { Shape } from "../interfaces/IShape";


/**
 * Kahn's Alogirthm
 * https://dl.acm.org/doi/10.1145/368996.369025
 * More readable alogirthm source:
 * https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm
 * 
 * @param vertexes - List of all vertexes 
 * @param arrowsMap - List of all edges
 * @param addNotifcation - a function to display errors
 * 
 * @returns undefined | sortedList : Shape[]
 */
export const topologicalSort = (
	vertexes: Shape[], 
	arrowsMap: ArrowMap, 
	addNotifcation: typeof addToast) =>
{
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


/**
 * A BFS algorithm. Note that it is a bit modified in that way that we don't have a goal vertex,
 * But instead we will just traverse the graph until we visited all the ancestors inputShape
 * 
 * @param inputShape - The input shape as it will be the "start_v" in the algorithm
 * @param arrowsMap - List of all edges
 * 
 * @returns Discovered shapes size
 */
export const BFSAncestorsCount = (
	inputShape: Shape,
	arrowsMap: ArrowMap) => 
{
	const discoveredShapes = new Set<Shape>();

	// Let Q be a queue
	const Q = new Queue<Shape>();

	// Label start_v as discovered
	discoveredShapes.add(inputShape);

	Q.enqueue(inputShape);

	// While Q is not empty do
	while(!Q.isEmpty()) {
		const v = Q.dequeue()!;
		
		// For all edges from v to w in G.adjacentEdges(v) do
		if(arrowsMap.getConnectedToCount(v) > 0) {
			for(const w of arrowsMap.getConnectedTo(v)!) {
				// If w is not labeled as discovered then
				if(!discoveredShapes.has(w)) {
					// Label w as discovered	
					discoveredShapes.add(w);

					// We could have set w.parent to be V
					// but we just care about ancestors count

					Q.enqueue(w);
				}
			}
		}
	}

	return discoveredShapes.size;
}