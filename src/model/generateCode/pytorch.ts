import ArrowMap from "../../interfaces/arrowmap";
import FullyConnected from "../../components/DiagramContainer/Shapes/FullyConnected";
import Concatenate from "../../components/DiagramContainer/Shapes/Concatenate";
import Output from "../../components/DiagramContainer/Shapes/Output";
import { Shape } from "../../interfaces/IShape";
import Convolutional from "../../components/DiagramContainer/Shapes/Convolutional";
import Flatten from "../../components/DiagramContainer/Shapes/Flatten";
import { AllActivationFunctions, ACTIVATION_RELU, ACTIVATION_SIGMOID, ACTIVATION_TANH, ACTIVATION_SOFTMAX, ACTIVATION_LOG_SOFTMAX } from "../../interfaces/activations";
import Addition from "../../components/DiagramContainer/Shapes/Addition";
import MaxPooling from "../../components/DiagramContainer/Shapes/MaxPooling";
import Dropout from "../../components/DiagramContainer/Shapes/Dropout";
import BatchNormalization from "../../components/DiagramContainer/Shapes/BatchNormalization";


export const getActivationFunction = (str: string, func?: AllActivationFunctions) => {
	switch(func) {
		case ACTIVATION_RELU:
			return "F.relu(" + str + ")";
		case ACTIVATION_SIGMOID:
			return "F.sigmoid(" + str + ")";
		case ACTIVATION_TANH:
			return "F.tanh(" + str + ")";
		case ACTIVATION_SOFTMAX:
			return "F.softmax(" + str + ")";
		case ACTIVATION_LOG_SOFTMAX:
			return "F.log_softmax(" + str + ")";
		default:
			return str;
	}
}

export const fillPytorchCode = (sortedList: Shape[], arrows: ArrowMap) => {
	const layersOutput: string[] = []
	const connectionsOutput: string[] = []
	
	for(let i = 1; i < sortedList.length; i++) {
		const currShape = sortedList[i];

		// Create the Layers in the constructor and
		// Create the connections in the forward method
		
		let previousIndex: number = -1, activationFunc: AllActivationFunctions | undefined;

		if(currShape.shape !== Concatenate && currShape.shape !== Addition) {

			previousIndex = sortedList.findIndex(s => s === arrows.getConnectedToMe(currShape)![0]);
			activationFunc = arrows.get([sortedList[previousIndex], currShape]);
		}

		if(currShape.shape === FullyConnected) {
			const inputDim = currShape.additionalInfo!.inputDimension;
			const outputDim = currShape.additionalInfo!.outputDimension;

			layersOutput.push("\t\tself.layer" + i + " = nn.Linear("+inputDim+", "+outputDim+")");
			connectionsOutput.push("\t\tx" + i + " = self.layer" + i + "("+getActivationFunction("x" + previousIndex + ")", activationFunc));
		}
		else if(currShape.shape === Concatenate) {
			const allIndexes: string[] = [];

			arrows.getConnectedToMe(currShape)!.forEach(connectedShape => {
				const connectedIndex = sortedList.findIndex(s => s.timestamp === connectedShape.timestamp);
				const activationFunc = arrows.get([sortedList[connectedIndex], currShape]);

				allIndexes.push(getActivationFunction("x" + connectedIndex, activationFunc));
			});

			connectionsOutput.push("\t\tx" + i + " = torch.cat((" + allIndexes.join(', ') + "), dim=1)");
		}
		else if(currShape.shape === Convolutional) {
			const inChannels = currShape.additionalInfo!.inChannels;
			const outChannels = currShape.additionalInfo!.outChannels;
			const kernelSize = currShape.additionalInfo!.kernelSize;
			const stride = currShape.additionalInfo!.stride;

			layersOutput.push("\t\tself.layer" + i + " = nn.Conv2d("+inChannels+", "+outChannels+", "+kernelSize+", "+stride+")");
			connectionsOutput.push("\t\tx" + i + " = self.layer" + i + "("+getActivationFunction("x" + previousIndex, activationFunc) + ")");
		}
		else if(currShape.shape === MaxPooling) {
			const kernelSize = currShape.additionalInfo!.kernelSize;

			connectionsOutput.push("\t\tx" + i + " = F.max_pool2d("+getActivationFunction("x" + previousIndex, activationFunc) + ", "+kernelSize+")");
		}
		else if(currShape.shape === Flatten) {
			
			connectionsOutput.push("\t\tx" + i + " = " + getActivationFunction("x" + previousIndex + ".reshape(x" + previousIndex + ".size(0), -1)", activationFunc));
		}
		else if(currShape.shape === Dropout) {
			const p = currShape.additionalInfo!.p;
			layersOutput.push("\t\tself.layer" + i + " = nn.Dropout(p="+p+")");
			connectionsOutput.push("\t\tx" + i + " = self.layer" + i + "("+getActivationFunction("x" + previousIndex + ")", activationFunc));
		}
		else if(currShape.shape === BatchNormalization) {
			const dimension = currShape.additionalInfo!.dimension.toString().toLowerCase();
			const numFeatures = currShape.additionalInfo!.numFeatures;

			layersOutput.push("\t\tself.layer" + i + " = nn.BatchNorm"+dimension+"("+numFeatures+")");
			connectionsOutput.push("\t\tx" + i + " = self.layer" + i + "("+getActivationFunction("x" + previousIndex + ")", activationFunc));
		}
		else if(currShape.shape === Addition) {
			const allIndexes: string[] = [];

			arrows.getConnectedToMe(currShape)!.forEach(connectedShape => {
				const connectedIndex = sortedList.findIndex(s => s.timestamp === connectedShape.timestamp);
				const activationFunc = arrows.get([sortedList[connectedIndex], currShape]);

				allIndexes.push(getActivationFunction("x" + connectedIndex, activationFunc));
			});

			connectionsOutput.push("\t\tx" + i + " = " + allIndexes.join(' + '));
		}
		else if(currShape.shape === Output) {
			const outputActivation = currShape.additionalInfo!.activation as AllActivationFunctions;
			connectionsOutput.push("\n\t\treturn "+getActivationFunction(getActivationFunction("x" + previousIndex + "", activationFunc), outputActivation));
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