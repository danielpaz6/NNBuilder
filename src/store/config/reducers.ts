import { ConfigState, ConfigActionTypes, UPDATE_DESIGN_TEMPLATE, UPDATE_SVG_REF } from "./types";
import { TEMPLATE_ABSTRACT } from "../../interfaces/designTemplates";

const initialState: ConfigState = {
	designTemplate: TEMPLATE_ABSTRACT
};

export function configReducer(state = initialState, action: ConfigActionTypes) : ConfigState {
	switch(action.type) {
		case UPDATE_DESIGN_TEMPLATE:
			return {
				...state,
				designTemplate: action.payload.design
			}

		case UPDATE_SVG_REF:
			return {
				...state,
				svgRef: action.payload.svgRef
			}

		default:
			return state;
	}
}