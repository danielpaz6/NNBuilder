import { ConfigActionTypes, UPDATE_DESIGN_TEMPLATE } from "./types";
import { TemplatesTypes } from "../../interfaces/designTemplates";

export function updateDesignTemplate(design: TemplatesTypes) : ConfigActionTypes {
	return {
		type: UPDATE_DESIGN_TEMPLATE,
		payload: {
			design: design
		}
	};
}