// Each module can have one default export;
// Default exports are imported using a different syntax;

class Point {
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

export = Point;