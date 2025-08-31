// Greet is an interface that describes a function taking string → returning string.
interface if4_Greet {
  (name: string): string;  // call signature
}
const if4_sayHello: if4_Greet = (name) => `Hello, ${name}`;
console.log(if4_sayHello("Alice")); // "Hello, Alice"

// YOu can also define multiple ways(overloads) to call the same function;
interface if4_StringFormatter {
  (input: string): string;
  (input: string, toUpper: boolean): string;
}
const if4_format: if4_StringFormatter = (input: string, toUpper?: boolean) => {
  return toUpper ? input.toUpperCase() : input.toLowerCase();
};
console.log(if4_format("Hello"));        // "hello"
console.log(if4_format("Hello", true));  // "HELLO"
