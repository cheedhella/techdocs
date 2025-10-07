// ✅ Example 1: Compatible Types
type Point = { x: number; y: number };
type Coordinate = { x: number; y: number };

// You can assigne a Point to Coordinate and Coordinate to a Point, b/c they have same structure;
let p: Point = { x: 10, y: 20 };
let c: Coordinate = p; // ✅ Allowed
console.log("Example 1:", c);


// ✅ Example 2: Extra Properties Allowed
type Person = { name: string };

let user = { name: "Alice", age: 25 };
let person: Person = user; // ✅ Allowed because user has "name"
console.log("Example 2:", person);

// ❌ Excess property check with object literal
// let person2: Person = { name: "Bob", age: 30 }; // Error


// ✅ Example 3: Functions are Structurally Typed
type Add = (a: number, b: number) => number;

function sum(x: number, y: number): number {
  return x + y;
}

let calc: Add = sum; // ✅ Allowed
console.log("Example 3:", calc(5, 7));


// ✅ Example 4: Interface Compatibility
interface Animal {
  name: string;
}

interface Dog {
  name: string;
  breed: string;
}

let a: Animal;
let d: Dog = { name: "Rex", breed: "Labrador" };

a = d; // ✅ Dog has at least Animal’s structure
console.log("Example 4:", a);


// ✅ Example 5: Flexible APIs with Structural Typing
interface Printable {
  print(): void;
}

function printIt(item: Printable) {
  item.print();
}

let book = {
  title: "TS Handbook",
  print() {
    console.log("Example 5:", this.title);
  }
};

printIt(book); // ✅ Works without "implements Printable"
