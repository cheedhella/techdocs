export class CharactersCollection {
    constructor(public data: string) { }
    get length(): number {
        return this.data.length;
    }

    /*
        > "X" > "a"
        false           # Why? 
        > "X".charCodeAt(0)
        87
        > "a".charCodeAt(0)
        97
        > 87 > 97
        false
    */
    compare(leftIndex: number, rightIndex: number): boolean {
        return this.data[leftIndex].toLocaleLowerCase() > this.data[rightIndex].toLocaleLowerCase();
    }

    swap(leftIndex: number, rightIndex: number): void {
        // Approach 1: Convert string to character array, once you have the array you can swap the elements in it; But, it is a overkill;
        const chars = this.data.split('');
        const temp = chars[leftIndex];
        chars[leftIndex] = chars[rightIndex];
        chars[rightIndex] = temp;
        this.data = chars.join('');
    }
}