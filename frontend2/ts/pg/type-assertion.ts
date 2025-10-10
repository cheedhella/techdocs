// Angular bracket syntax 
let ta_x1: any = "hello world";
let ta_x1_len: number = (<string>ta_x1).length;

// as syntax 
let ta_x2: any = "hello world";
let ta_x2_len: number = (ta_x2 as string).length;


function getLength(x: string | string[]) {
  if (typeof x === "string") {
    return x.length;
  } else {
    return (x as string[]).length;
  }
}
console.log(getLength("hello"));
console.log(getLength(["hello", "world"]));

// When to Use Type Assertion?
// 1. working with DOM API 
// Methods like document.getElementById() returns an HTMLElement, because it doesn't know the specific type of the element (e.g., HTMLCanvasElement, HTMLInputElement);
/*
let ta_el = document.querySelector("#myInput");
// TypeScript thinks ta_el is `Element | null`
// But if you *know* it's an input element:
let inputEl = ta_el as HTMLInputElement;
inputEl.value = "Hello!";
*/

// 2. APIs that return any;
// If you get data from a JSON API that's not strictly typed, you might need to assert the type to access the properties safely.


// Double assertion
// Sometimes, TypeScript's compiler will prevent a type assertion, if the source and target types are too different;
// In such cases, you can use a "double assertion" by first asserting to unknown or any, and then to the desired type;
function someFunction(value: string) {
  // Error: 'string' and 'number' are too different
  // let num = value as number; 

  // Correct (but use with caution!):
  let num = (value as unknown) as number;
  return num;
}
console.log(someFunction("123"));
