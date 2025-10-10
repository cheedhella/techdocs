/*
What is a Type?
    It refers to all different properties and methods that a value can have;
    In TypeScript, every possible value can have a Type; If you define it's Type, TypeScript compiler does it's best to catch errors;

    Eg: const today = new Date();
        today.      # Type of today is inferred as Date and the moment you type dot, you will get all properties and methods available on a Date object;
                    # If you use any property that is not available, you will get an error right away;

    Eg2: const person = { age: 20 };
        console.log(person.asdf); // As person doesn't have any property named asdf, TSC immediately throws an error=]-

What is the importance of Types?
    - They help TypeScript compiler to analyze the code for possible errors;
    - They help developers to understand what values flowing around the codebase;
*/
// ---------------------------------------------------------------------------------------------------------------------------

// Primitive datatypes - boolean, number, string/template string, null vs undefined, void, any;
let isDone: boolean = false;
let age: number = 25;
let fullName: string = "MC";
console.log("isDone: " + isDone + ", age: " + age + ", fullName: " + fullName);

// Backquotes are used to escape template strings
let myString: string = `Hello, I am ${fullName}. I will be ${age + 1} next month.`;
console.log(`Template String: ${myString}`);

// ---------------------------------------------------------------------------------------------------------------------------
// null vs undefined - same as JavaScript; They are special values, not data types;
// undefined - a variable is declared, but hasn't been initialized with any value, it will default to undefined;
// null - a variable which is declared and initialized with null, indicates it is intentionally left unitilized at that moment;
console.log('null vs undefined');

// Another difference is while performing primitive operations, null gets converted to 0 and undefined is converted to NaN;
let myUndefinedVar; console.log(myUndefinedVar + 100); // NaN
let myNullVar = null; console.log(myNullVar + 100); // 100

console.log(typeof(myUndefinedVar)); // undefined
console.log(typeof(myNullVar)); // object

// Douglas Crockford thinks null is a bad idea and we should all just use undefined;

// ---------------------------------------------------------------------------------------------------------------------------
// void
// You can declare a variable of type void, but you can assign only null or undefined to it, so it is not useful;
// You can declare a function with void return type. A function with void return type can return null or undefined(defaults to undefined);

function sayHi(): void {
    console.log('hi');
}
console.log(sayHi()); // undefined

function sayHi2(): void {
    console.log('hi');
    return null;
}
console.log(sayHi2()); // null
// ---------------------------------------------------------------------------------------------------------------------------
// never
// It indicates something is never going to happen!
// For example, a function which always throws an exception OR never reaches it's endpoint;
function throwError(errorMsg: string): never { 
    throw new Error(errorMsg); 
} 
function keepProcessing(): never { 
    while (true) { 
        console.log('I always does something and never ends.')
    }
}
// ---------------------------------------------------------------------------------------------------------------------------
// void VS never
// You can assign null or undefined to a void type variable;
// But, you can't assign anything to a never type;
let something: void = null;
// let nothing: never = null; // Error: Type 'null' is not assignable to type 'never'

let myThrowError = throwError('errrr'); // It never returns!
console.log(myThrowError); // So, It is never executed!

// More Info: https://stackoverflow.com/questions/42291811/use-of-never-keyword-in-typescript
// ---------------------------------------------------------------------------------------------------------------------------
// any 
//      It is the super type of all types in TypeScript;
//      You can assign any type of value to it;
//      It is equivalent to opting out of type checking for a variable;
//      When you use dot with any type variable, your code editor can't list the properties and methods available on it;
//      Avoid any type, unless absolutely necessary;

let myAny: any = 10; // Could be a number!
myAny = 'hello'; // Could be a string!
myAny = true; // Could be a boolean!

/*
Why the return type of JSON.parse() is Any?
    If input is 'true', it returns true; // Of type boolean;
    If input is '4', it returns 4; // Of type number;
    If input is '{"value": 5}', it returns {value: 5} // Of type Object;
    
    TypeScript has no idea on return type of JSON.parse(), it all depends on your input;
    You can use any type in such case;
*/