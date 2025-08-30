import { IPointInterface } from "./IPoint"

export class Point implements IPointInterface {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	
	distanceFromOrigin(): number {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}
}

// Export can be renamed if used outside the file.
export { Point as PointClass };