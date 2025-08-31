// ✅ 1. Basic Function Declaration
function greet(name: string): string {
  return `Hello, ${name}`;
}
console.log(greet("Alice"));

// ✅ 2. Function Expression
const add = function (a: number, b: number): number {
  return a + b;
};
console.log("Add:", add(5, 3));

// ✅ 3. Arrow Function
const multiply = (a: number, b: number): number => a * b;
console.log("Multiply:", multiply(4, 2));

// ✅ 4. Optional Parameters
function greetUser(name: string, age?: number): string {
  return age ? `${name} is ${age} years old` : `Hello, ${name}`;
}
console.log(greetUser("Bob"));
console.log(greetUser("Charlie", 30));

// ✅ 5. Default Parameters
function greetMsg(name: string = "Guest"): string {
  return `Welcome, ${name}`;
}
console.log(greetMsg());
console.log(greetMsg("Dave"));

// ✅ 6. Rest Parameters
function sumAll(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}
console.log("Sum:", sumAll(1, 2, 3, 4, 5));

// ✅ 7. Function Types
let calculator: (x: number, y: number) => number;
calculator = (x, y) => x - y;
console.log("Calculator (Subtract):", calculator(10, 4));

// ✅ 8. Void Function
function logMessage(msg: string): void {
  console.log("Log:", msg);
}
logMessage("This is a log message!");

// ✅ 9. Never Function
function throwError(message: string): never {
  throw new Error(message);
}
// Uncommenting the below line will crash the program
// throwError("Something went wrong!");

// ✅ 10. Function Overloading
function getLength(x: string): number;
function getLength(x: any[]): number;
function getLength(x: any): number {
  return x.length;
}
console.log("Length of string:", getLength("Hello"));
console.log("Length of array:", getLength([1, 2, 3, 4]));

