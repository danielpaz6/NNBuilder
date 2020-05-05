import { TemplatesTypes } from "../../interfaces/designTemplates";

export interface ConfigState {
	designTemplate: TemplatesTypes;
	svgRef?: SVGSVGElement;
}

export const UPDATE_DESIGN_TEMPLATE = "UPDATE_DESIGN_TEMPLATE";
export const UPDATE_SVG_REF = "UPDATE_SVG_REF";

interface UpdateSVGRef {
	type: typeof UPDATE_SVG_REF;
	payload: {
		svgRef: SVGSVGElement
	}
}

interface UpdateDesignTempalte {
	type: typeof UPDATE_DESIGN_TEMPLATE;
	payload: {
		design: TemplatesTypes;
	}
}

export type ConfigActionTypes = 
	UpdateDesignTempalte |
	UpdateSVGRef;