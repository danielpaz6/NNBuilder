import FullyConnectedForm from "./FullyConnectedForm";
import ConvolutionalForm from "./ConvolutionalForm";
import MaxPoolingForm from "./MaxPoolingForm";
import DropoutForm from "./DropoutForm";
import BatchNormalizationForm from "./BatchNormalizationForm";
import OutputForm from "./OutputForm";

export type FormList =
	typeof FullyConnectedForm |
	typeof ConvolutionalForm |
	typeof MaxPoolingForm |
	typeof DropoutForm |
	typeof BatchNormalizationForm |
	typeof OutputForm
;


export const formsMap: Record<string, FormList> = {
	"FullyConnectedForm": FullyConnectedForm,
	"ConvolutionalForm": ConvolutionalForm,
	"MaxPoolingForm": MaxPoolingForm,
	"DropoutForm": DropoutForm,
	"BatchNormalizationForm": BatchNormalizationForm,
	"OutputForm": OutputForm
}