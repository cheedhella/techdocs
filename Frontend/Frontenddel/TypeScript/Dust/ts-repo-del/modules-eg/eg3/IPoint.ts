interface IPoint {
	x: number;
	y: number;
	distanceFromOrigin(): number;
}

// Export can be renamed if used outside the file.
export { IPoint as IPointInterface };