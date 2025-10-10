export class NumbersCollection {
    constructor(public data: number[]) { }
    get length(): number {      // Note: We defined it as accessor, so that length can used as a property;
        return this.data.length;
    }
    compare(leftIndex: number, rightIndex: number): boolean {
        return this.data[leftIndex] > this.data[rightIndex];
    }

    swap(leftIndex: number, rightIndex: number): void {
        const leftData = this.data[leftIndex];
        this.data[leftIndex] = this.data[rightIndex];
        this.data[rightIndex] = leftData;
    }
}