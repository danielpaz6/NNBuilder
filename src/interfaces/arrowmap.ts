import { AllActivationFunctions } from "./activations";
import { Shape } from "./IShape";

export default class ArrowMap {
	/*private activationMap = new Map<string, AllActivationFunctions>();
	private connectedToMap = new Map<Shape, Shape[]>();
	private connectedToMeMap = new Map<Shape, Shape[]>();*/

	private activationMap = new Map<string, AllActivationFunctions>();
	private connectedToMap = new Map<Shape, Shape[]>();
	private connectedToMeMap = new Map<Shape, Shape[]>();

	constructor(otherArrowMap?: ArrowMap) {
		if(otherArrowMap)
		{
			this.activationMap = new Map<string, AllActivationFunctions>(otherArrowMap.activationMap); 
			this.connectedToMap = new Map<Shape, Shape[]>(otherArrowMap.connectedToMap);
			this.connectedToMeMap = new Map<Shape, Shape[]>(otherArrowMap.connectedToMeMap);
		}
	}

    set(key: [Shape, Shape], value: AllActivationFunctions): this {
		const newKey = key[0].timestamp + "|" + key[1].timestamp;
		this.activationMap.set(newKey, value);

		if(this.connectedToMap.has(key[0]))
			this.connectedToMap.get(key[0])!.push(key[1]);
		else
			this.connectedToMap.set(key[0], [key[1]]);

		if(this.connectedToMeMap.has(key[1]))
			this.connectedToMeMap.get(key[1])!.push(key[0]);
		else
			this.connectedToMeMap.set(key[1], [key[0]]);

        return this;
    }

    get(key: [Shape, Shape]): AllActivationFunctions | undefined {
        return this.activationMap.get(key[0].timestamp + "|" + key[1].timestamp);
    }

    deleteArrow(key: [Shape, Shape]): boolean {
		if(!this.connectedToMap.get(key[0]) || !this.connectedToMeMap.get(key[1]))
			return false;

		this.connectedToMap.set(
			key[0], 
			this.connectedToMap.get(key[0])!.filter(s => s !== key[1])
		);

		this.connectedToMeMap.set(
			key[1], 
			this.connectedToMeMap.get(key[1])!.filter(s => s !== key[0])
		);

		return this.activationMap.delete(key[0].timestamp + "|" + key[1].timestamp);
    }

    has(key: [Shape, Shape]): boolean {
        return this.activationMap.has(key[0].timestamp + "|" + key[1].timestamp);
    }

    get size() {
        return this.activationMap.size;
	}

	getConnectedToCount(targetShape: Shape) : number {
		return this.connectedToMap.has(targetShape) ? this.connectedToMap.get(targetShape)!.length : 0;
	}

	getConnectedToMeCount(targetShape: Shape) : number {
		return this.connectedToMeMap.has(targetShape) ? this.connectedToMeMap.get(targetShape)!.length : 0;
	}

	getConnectedToMe(shape: Shape) : Shape[] | undefined {
		return this.connectedToMeMap.get(shape);
	}

	getConnectedTo(shape: Shape) : Shape[] | undefined {
		return this.connectedToMap.get(shape);
	}
	
	getList() {
		const newList: [Shape, Shape, AllActivationFunctions][] = [];

		this.connectedToMap.forEach((value, sourceShape) => {
			
			value.forEach(targetShape =>
			{
				newList.push(
				[
					sourceShape,
					targetShape,
					this.get([sourceShape, targetShape])!
				])
			})
		});

		return newList;
	}

    /*forEach(callbackfn: (value: AllActivationFunctions, key: string, map: Map<[Shape, Shape], AllActivationFunctions>) => void, thisArg?: any): void {
        this.map.forEach((value, key) => {
            callbackfn.call(thisArg, value, key, this);
        });
    }*/
}