import ArrowMap from "../../interfaces/arrowMap";
import FullyConnected from "../../components/DiagramContainer/Shapes/FullyConnected";
import Concatenate from "../../components/DiagramContainer/Shapes/Concatenate";
import Output from "../../components/DiagramContainer/Shapes/Output";
import { Shape } from "../../interfaces/IShape";

export const fillPytorchCode = (sortedList: Shape[], arrows: ArrowMap) => {
	const layersOutput: string[] = []
	const connectionsOutput: string[] = []
	
	for(let i = 1; i < sortedList.length; i++) {
		const currShape = sortedList[i];

		// Create the Layers in the constructor and
		// Create the connections in the forward method

		if(currShape.shape === FullyConnected) {
			const inputDim = currShape.additionalInfo!.inputDimension;
			const outputDim = currShape.additionalInfo!.outputDimension;

			layersOutput.push("\t\tself.layer" + i + " = nn.Linear("+inputDim+", "+outputDim+")");

			const previousIndex = sortedList.findIndex(s => s === arrows.getConnectedToMe(currShape)![0]);
			connectionsOutput.push("\t\tx" + i + " = self.layer" + i + "(x" + previousIndex + ")");
		}
		else if(currShape.shape === Concatenate) {
			const allIndexes: string[] = [];

			arrows.getConnectedToMe(currShape)!.forEach(connectedShape => {
				allIndexes.push("x" + sortedList.findIndex(s => s === connectedShape));
			});

			connectionsOutput.push("\t\tx" + i + " = torch.cat((" + allIndexes.join(', ') + "), dim=1)");
		}
		else if(currShape.shape === Output) {
			const previousIndex = sortedList.findIndex(s => s === arrows.getConnectedToMe(currShape)![0]);
			connectionsOutput.push("\n\t\treturn x" + previousIndex + "");
		}
	}

	return {
		layersOutput,
		connectionsOutput
	};
}

export const generateFullPyTorchCode = (sortedList: Shape[], arrows: ArrowMap) => {
	const {layersOutput, connectionsOutput} = fillPytorchCode(sortedList, arrows);

	return headerCode[0] + layersOutput.join('\n') + headerCode[1] + connectionsOutput.join('\n');
}

export const headerCode = [`import torch
import torch.nn as nn
import torch.nn.functional as F

class GeneratedNetwork(nn.Module):
\tdef __init__(self):
\t\tsuper(GeneratedNetwork, self).__init__()\n
\t\t# Model layers\n`,`\n\n\tdef forward(self, x0):\n`];