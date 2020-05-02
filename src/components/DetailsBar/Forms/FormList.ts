import FullyConnectedForm from "./FullyConnectedForm";
import ConvolutionalForm from "./ConvolutionalForm";

export type FormList =
	typeof FullyConnectedForm |
	typeof ConvolutionalForm;


export const formsMap: Record<string, FormList> = {
	"FullyConnectedForm": FullyConnectedForm,
	"ConvolutionalForm": ConvolutionalForm
}