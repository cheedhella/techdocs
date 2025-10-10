// import { NumbersCollection } from './NumbersCollection';

// You can be sorted, if you implement this interface!
interface Sortable {
    length: number;
    compare(leftIndex: number, rightIndex: number): boolean;
    swap(leftIndex: number, rightIndex: number): void;
}

export class Sorter {
    // constructor(public collection: NumbersCollection) { }
    constructor(public collection: Sortable) { }

    sort(): void {
        const { length } = this.collection; // value and type of length comes from collection; // const length = this.collection.length;

        // Bubble sorting implementation
        /*
        for(let i = 0; i < length ; i++) {
            for(let j = 0; j < length - i - 1; j++) {
                if(this.collection[j] > this.collection[j + 1]) {
                    const temp = this.collection[j];
                    this.collection[j] = this.collection[j + 1];
                    this.collection[j + 1] = temp;
                }
            }
        }
        */
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length - i - 1; j++) {
                if (this.collection.compare(j, j + 1)) {
                    this.collection.swap(j, j + 1);
                }
            }
        }

    }
}