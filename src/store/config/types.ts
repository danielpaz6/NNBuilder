import { TemplatesTypes } from "../../interfaces/designTemplates";

export interface ConfigState {
	designTemplate: TemplatesTypes;
}

export const UPDATE_DESIGN_TEMPLATE = "UPDATE_DESIGN_TEMPLATE";

interface UpdateDesignTempalte {
	type: typeof UPDATE_DESIGN_TEMPLATE;
	payload: {
		design: TemplatesTypes;
	}
}

export type ConfigActionTypes = 
	UpdateDesignTempalte;