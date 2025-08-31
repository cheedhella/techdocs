// Primitive Types
let username: string = "Alice";
let age: number = 25;                     // represents integers and floating-point numbers
let isAdmin: boolean = true;
let nothingHere: null = null;
let notDefined: undefined = undefined;    // a variable that has not been assigned a value
let bigNumber: bigint = 9007199254740991n;
let uniqueId: symbol = Symbol("id");      // represents a unique and immutable value

// Special Types
// any -> disables type checking; dangerous, b/c it defeats the purpose of typescript's safety;
let anything: any = "I can be anything";  ;
anything = 42; // works
// console.log(anything.toUpperCase()); // ✅ allowed (even if it's not a string!), it causes runtime error, rather than compile time error;

// unknown -> It also means anything, but you can't use it directly without narrowing or type checking;
// It is safer b/c you are forced to check the type before using it; 
let unsure: unknown = "could be anything";
if (typeof unsure === "string") {
  console.log(unsure.toUpperCase());
}

// never -> a function that never returns a value, always throws an error;
function throwError(message: string): never {
  throw new Error(message);
}

// void -> used for functions that return nothing;
function logMessage(): void {
  console.log("This function returns nothing");
}

// Object Types
let user: object = { id: 1, name: "Alice" };

// array -> list of values of same type; 
let numbers: number[] = [1, 2, 3, 4];
let strings: Array<string> = ["one", "two", "three"];

// Tuple -> list of elements, where each element has it's own type;
let person: [string, number] = ["Alice", 25]; // First member shoule be string and second one should be number;

// Enum -> defines a set of named constants;
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
let move: Direction = Direction.Up;

// Advanced Types
// union -> variable can hold multiple types;
let id: string | number = "ABC123"; // union type

// intersection -> combine multiple types;
type Employee = { name: string };
type Manager = { role: string };
type TeamLead = Employee & Manager;
let teamLead: TeamLead = { name: "Bob", role: "Lead" };

// Literals -> specific values as type;
let direction: "up" | "down"; // literal type
direction = "up"; // ✅
// direction = "left"; ❌ (error)

// Type Alias -> create custom types
type Point = { x: number; y: number };
let p: Point = { x: 10, y: 20 };

// Interface -> define object structure;
interface User {
  id: number;
  name: string;
}
let u: User = { id: 1, name: "Charlie" };

// Output examples
console.log("Username:", username);
console.log("Age:", age);
console.log("Is Admin:", isAdmin);
console.log("Big Number:", bigNumber);
console.log("Unique ID:", uniqueId.toString());
console.log("Numbers:", numbers);
console.log("Strings:", strings);
console.log("Person Tuple:", person);
console.log("Enum Direction:", move);
console.log("Union ID:", id);
console.log("Team Lead:", teamLead);
console.log("Point:", p);
console.log("Interface User:", u);

logMessage();

