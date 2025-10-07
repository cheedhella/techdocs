/*
What is Union?
    It allows you to define a variable of more than one data type;
    Syntax: (type1 | type2 | type3 | ... | typeN)
*/

// ---------------------------------------------------------------------------------------------------------------------
// Declaration
let myUnion1: (string | number); // It could be string OR number!
myUnion1 = 123;
myUnion1 = "hello";
// myUnion1 = false; // Type 'false' is not assignable to type 'string | number'.ts(2322)

let myUnion2: (string | boolean);
myUnion2 = "hello";
myUnion2 = false;
// myUnion2 = 123; // Type '123' is not assignable to type 'string | boolean'.ts(2322)

// ---------------------------------------------------------------------------------------------------------------------
// You can pass union to a function as well!
function displayUnion(myUnion3: (string | number)) {
    if(typeof(myUnion3) === "number")
        console.log('myUnion3 is number.');
else if(typeof(myUnion3) === "string")
    console.log('myUnion3 is string.');
}

displayUnion(123); // Output: Code is number.
displayUnion("ABC"); // Output: Code is string.
// displayUnion(true); // Argument of type 'true' is not assignable to parameter of type 'string | number'.ts(2345)

// ---------------------------------------------------------------------------------------------------------------------
// Array of Unions 
// This code defines arrays that can hold either Customer or CustomerNew objects (and only Customer and CustomerNew objects)
// var custsExpanded: (Customer | CustomerNew)[];
// var custsExpanded: Array<Customer | CustomerNew>;

let numbersAndStrings: (string|number)[] = ["a string", 12]; // array of strings and numbers
let numbersAndStrings2: string|number[]; // Type of numbersAndStrings2 is either a string or an array of number


// When the type can't be inferred because the initial array is empty, the behavior of the TypeScript compiler 
// depends on the value of the noImplicitAny compiler option. 
// If it is true, any[] is assumed, as shown here:
let canInferTypes = []; // Type of canInferTypes is any[]

// If it is false, an array of impossible values is assumed; that is, never[]:
// Such a type is completely useless, since we can't add any value to such an array:






// TODO: Array of Unions vs Tuple; https://stackoverflow.com/questions/28793918/tuple-type-vs-array-of-union-type
