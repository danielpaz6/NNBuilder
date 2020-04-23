import { Shape } from "../store/shapes/types";
import { AllActivationFunctions } from "./activations";

export class ArrowMap {
	private map = new Map<string, AllActivationFunctions>();
	private reverseMap = new Map<string, [Shape, Shape]>();

	constructor(otherArrowMap?: ArrowMap) {
		if(otherArrowMap)
		{
			this.map = new Map<string, AllActivationFunctions>(otherArrowMap.map); 
			this.reverseMap = new Map<string, [Shape, Shape]>(otherArrowMap.reverseMap);
		}
	}

    set(key: [Shape, Shape], value: AllActivationFunctions): this {
		const newKey = key[0].timestamp + "|" + key[1].timestamp;
		this.map.set(newKey, value);
		this.reverseMap.set(newKey, [key[0], key[1]]);

        return this;
    }

    get(key: [Shape, Shape]): AllActivationFunctions | undefined {
        return this.map.get(key[0].timestamp + "|" + key[1].timestamp);
    }

    clear() {
        this.map.clear();
    }

    delete(key: [Shape, Shape]): boolean {
        return this.map.delete(key[0].timestamp + "|" + key[1].timestamp);
    }

    has(key: [Shape, Shape]): boolean {
        return this.map.has(key[0].timestamp + "|" + key[1].timestamp);
    }

    get size() {
        return this.map.size;
	}
	
	getList() {
		const newList: [[Shape, Shape], AllActivationFunctions][] = [];
		this.map.forEach((value, key) => {

			if(this.reverseMap.has(key))
			{
				newList.push(
				[
					this.reverseMap.get(key)!,
					value
				])
			}
		});

		return newList;
	}

    /*forEach(callbackfn: (value: AllActivationFunctions, key: string, map: Map<[Shape, Shape], AllActivationFunctions>) => void, thisArg?: any): void {
        this.map.forEach((value, key) => {
            callbackfn.call(thisArg, value, key, this);
        });
    }*/
}