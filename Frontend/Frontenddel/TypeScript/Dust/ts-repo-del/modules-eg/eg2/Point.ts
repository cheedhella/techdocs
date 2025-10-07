import { IPoint } from "./IPoint"

export class Point implements IPoint {
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
