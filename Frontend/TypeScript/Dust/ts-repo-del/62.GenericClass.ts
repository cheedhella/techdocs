class GenericType1<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    display(): void {
        console.log(`GenericType1: Value = ${this.value}`);
    }
}

let p62_gt1_1 = new GenericType1<number>(10);
p62_gt1_1.display();
let p62_gt1_2 = new GenericType1<string>("hello");
p62_gt1_2.display();

// -----------------------------------------------------------------------------------------------
class GenericType2<T, U> {
    private key: T;
    private value: U;

    constructor(key: T, value: U) {
        this.key = key;
        this.value = value;
    }

    display(): void {
        console.log(`GenericType2: Key = ${this.key}, value = ${this.value}`);
    }
}

let p62_gt2_1 = new GenericType2<number, string>(10, "h10");
p62_gt2_1.display();
let p62_gt2_2 = new GenericType2<string, boolean>("hello", false);
p62_gt2_2.display();

// -----------------------------------------------------------------------------------------------
// Eg #3: A Generic class can implement a Generic interface!
interface GenericType3<T, U> {
    display(key: T, value: U): void;
}

class GenericType4<T, U> implements GenericType3<T, U> {
    private key: T;
    private value: U;

    constructor(key: T, value: U) {
        this.key = key;
        this.value = value;
    }

    display(): void {
        console.log(`GenericType4: Key = ${this.key}, value = ${this.value}`);
    }
}

let p62_gt4_1 = new GenericType4<number, string>(10, "h10");
p62_gt4_1.display();
let p62_gt4_2 = new GenericType4<string, boolean>("hello", false);
p62_gt4_2.display();

// Conditional Types
// https://www.copycat.dev/blog/typescript-generics/