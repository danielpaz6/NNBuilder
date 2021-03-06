import { AdditionalInformationType } from "../../../interfaces/IShape";

export interface IFormProps {
	handleParamaterChange: (event: React.ChangeEvent<HTMLInputElement>, key: string) => void;
	handleParameterChangeByValue: (value: number, key: string) => void;
	handleParamaterChangeSelect: (event: React.ChangeEvent<HTMLSelectElement>, key: string) => void;
	shapeAdditionalInfo: Record<string, AdditionalInformationType>;
}