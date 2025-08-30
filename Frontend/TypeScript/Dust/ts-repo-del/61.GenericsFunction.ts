/*
What is Generics?
    Traditionally, you can use any type to allow all data types in your function;
    However, when you use the any data type, you lose the benefit of type checking that typescript provides;
    Generics provide a mechanism to write code that works with a wide range of types, without compromising on type checking; 
    For eg, you can write function to find given element in the list, where list could be made of strings, numbers or any other type;

*/

// Generic Function

// Define
// To define a generic type, we use angular brackets;
// With in the angular brackets, you can give any name to the type; 
// We usually use the letter T, to declare a generic type;
function genericIdentity<T>(value: T): T {
    return value;    
}

// Invoke
let gi_1 = genericIdentity<string>("welcome1");
console.log(gi_1);  // welcome1
let gi_2 = genericIdentity("welcome2");     // TS can infer the type of parameters passed to the function;
console.log(gi_2);  // welcome2
let gi_3 = genericIdentity<number>(4);
console.log(gi_3);  // 4
let gi_4 = genericIdentity<boolean>(true);
console.log(gi_4);  // true


// Define a generic function which returns nothing;
function genericPrint<T>(value: T) {
    console.log(`T is: ${value}, typeof T is : ${typeof value}`);
}
genericPrint(1);               // genericPrint<number>(1);
genericPrint("test");          // genericPrint<string>("test");
genericPrint(true);            // genericPrint<boolean>(true);
genericPrint(() => { });       // 
genericPrint({ id: 1 });       // 


// Eg2
function printGenericPair<A, B>(first: A, second: B) {
    console.log(`typeof A is : ${typeof first}, typeof B is : ${typeof second}`);
}
printGenericPair<number, string>(1, "test");
printGenericPair(1, "test");
printGenericPair<boolean, boolean>(true, false);
printGenericPair("first", "second");
