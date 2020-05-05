export const ACTIVATION_RELU = "ReLU";
export const ACTIVATION_SIGMOID = "Sigmoid";
export const ACTIVATION_TANH = "Tanh";
export const ACTIVATION_SOFTMAX = "Softmax";
export const ACTIVATION_LOG_SOFTMAX = "Log Softmax";
export const ACTIVATION_NONE = "ACTIVATION_NONE";

export type AllActivationFunctions = 
	typeof ACTIVATION_RELU | 
	typeof ACTIVATION_SIGMOID | 
	typeof ACTIVATION_TANH |
	typeof ACTIVATION_NONE |
	typeof ACTIVATION_SOFTMAX |
	typeof ACTIVATION_LOG_SOFTMAX
;
