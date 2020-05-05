import FullyConnectedForm from "./FullyConnectedForm";
import ConvolutionalForm from "./ConvolutionalForm";
import MaxPoolingForm from "./MaxPoolingForm";
import DropoutForm from "./DropoutForm";
import BatchNormalizationForm from "./BatchNormalizationForm";
import OutputForm from "./OutputForm";
import { LayerTypes } from "../../../interfaces/shapes";
import Convolutional from "../../DiagramContainer/Shapes/Convolutional";
import MaxPooling from "../../DiagramContainer/Shapes/MaxPooling";
import Dropout from "../../DiagramContainer/Shapes/Dropout";
import BatchNormalization from "../../DiagramContainer/Shapes/BatchNormalization";
import FullyConnected from "../../DiagramContainer/Shapes/FullyConnected";
import Output from "../../DiagramContainer/Shapes/Output";
import InputForm from "./InputForm";
import Input from "../../DiagramContainer/Shapes/Input";

export type FormList =
	typeof FullyConnectedForm |
	typeof ConvolutionalForm |
	typeof MaxPoolingForm |
	typeof DropoutForm |
	typeof BatchNormalizationForm |
	typeof OutputForm |
	typeof InputForm
;


export const formsMap = new Map<LayerTypes, FormList>();

formsMap.set(FullyConnected, FullyConnectedForm);
formsMap.set(Convolutional, ConvolutionalForm);
formsMap.set(MaxPooling, MaxPoolingForm);
formsMap.set(Dropout, DropoutForm);
formsMap.set(BatchNormalization, BatchNormalizationForm);
formsMap.set(Output, OutputForm);
formsMap.set(Input, InputForm);