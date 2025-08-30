// What is a Spread?
//		Spread operator(...) is used to destructure arrays and objects.

// ----------------------------------------------------------------------------------------
// Old way: Destructuring array using apply() method!
// ----------------------------------------------------------------------------------------
var a1 = [1, 2, 3, 4, 5];
console.log(a1); 						// [1, 2, 3, 4, 5]
console.log.apply(console, a1);    // 1 2 3 4 5 	-> Array is destructured!
console.log(1, 2, 3, 4, 5); 			// 1 2 3 4 5

// ----------------------------------------------------------------------------------------
// Typescript way: Spread operator can be used to destructure!
// ----------------------------------------------------------------------------------------
var a2 = [1, 2, 3, 4, 5];
console.log('Destructuring using spread operator: ');
console.log(...a2);

// ----------------------------------------------------------------------------------------
// Spread operator or destructuring is used to create an array from an existing array!
// ----------------------------------------------------------------------------------------
let a3 = [1, 2, 3];
let a4 = [4, 5, 6];

let a3_copy1 = [...a3];	// creat new array from existing one!
console.log(a3_copy1); // [1, 2, 3]

let a3_copy2 = [...a3, 7, 8];	// creat new array from existing one + more elements!
console.log(a3_copy2); // [1,2,3,7,8]

let a3_a4_merged = [...a3, ...a4];
console.log(a3_a4_merged); // [1,2,3,4,5,6]


// ----------------------------------------------------------------------------------------
// Spread operator or destructuring is used to create an object from an existing object!
// ----------------------------------------------------------------------------------------

let o1 = {a: 1, b: 2, c: 3};
let o2 = {d: 4, e: 5, f: 6};

let o1_copy1 = {...o1}; // creat new object from existing one!
console.log(o1_copy1);  // {a: 1, b: 2, c: 3}

let o1_copy2 = {...o1, g: 7, h: 8}; // creat new object from existing one + more elements!
console.log(o1_copy2);  // {a: 1, b: 2, c: 3, g: 7, h: 8}

let o1_copy3 = {...o1, c: 10};
console.log(o1_copy3);  // {a: 1, b: 2, c: 10}

let o1_copy4 = {c: 10, ...o1};
console.log(o1_copy4);  // {a: 1, b: 2, c: 3}

let o1_o2_merged = {...o1, ...o2}; // Create object by merging two objects!
console.log(o1_o2_merged);  // {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}

// ----------------------------------------------------------------------------------------
// Spread operator makes it possible to unpack values from arrays OR properties from objects into distinct variables!
// ----------------------------------------------------------------------------------------

// function myFunction(x?:number, y?:number, z?:number):void { 
// Above throws this error: "Expected 3 arguments, but got 0 or more"

// Spread operator works only when all parameters are marked as optional
function myFunction(x?:number, y?:number, z?:number):void { 
    console.log(x);
    console.log(y);
    console.log(z);
}

var a5 = [0, 1, 2];

myFunction(...a5);

// You can use Spread operator to clone an array;
let myOrigArr: number[] = [10, 20, 30];
let myClonedArr = [...myOrigArr];
console.log(myOrigArr); // [10, 20, 30]
console.log(myClonedArr); // [10, 20, 30]
myOrigArr.push(40);
console.log(myOrigArr);     // [10, 20, 30, 40]  is "changed"
console.log(myClonedArr);   // [10, 20, 30]  is "unchanged"

// You can use Spread operator to merge 2 arrays:
let scores1: number[] = [10, 20, 30];
let scores2: number[] = [40, 50, 60];
let mergedScores = [...scores1, ...scores2];
console.log(mergedScores);   // [ 10, 20, 30, 40, 50, 60 ]