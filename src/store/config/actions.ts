import { ConfigActionTypes, UPDATE_DESIGN_TEMPLATE, UPDATE_SVG_REF } from "./types";
import { TemplatesTypes } from "../../interfaces/designTemplates";

export function updateDesignTemplate(design: TemplatesTypes) : ConfigActionTypes {
	return {
		type: UPDATE_DESIGN_TEMPLATE,
		payload: {
			design: design
		}
	};
}

export function updateSVGRef(ref: SVGSVGElement) : ConfigActionTypes {
	return {
		type: UPDATE_SVG_REF,
		payload: {
			svgRef: ref
		}
	}
}