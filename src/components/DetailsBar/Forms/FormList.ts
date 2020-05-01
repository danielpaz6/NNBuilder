import FullyConnectedForm from "./FullyConnectedForm"

export type FormList = typeof FullyConnectedForm;


export const formsMap: Record<string, FormList> = {
	"FullyConnectedForm": FullyConnectedForm
}