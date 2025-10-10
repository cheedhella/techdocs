// Array
// TypeScript arrays are analogous to JavaScript arrays.
// Only difference is all elements in the array must be of same type;
// ---------------------------------------------------------------------------------------------------------------------
// Creating an Array
var myArr1 = [1, 2, 3]; // Type of myArr1 is inferred as number[]
var myArr2 = []; // Type of myArr2 is inferred as any[]
var myArr3: number[] = [10, 12, 14];
var myArr4: Array<number> = [11, 13, 15];

// Extracting Array values
// TS can do type inferrence while extracting values from array;
var myArr1_v1 = myArr1[0]; // Type of myArr1_v1 is inferred as number
var myArr1_v2 = myArr1.pop(); // It returns last element of the array; Type of myArr1_v2 is inferred as number;

// Arrays are dynamic, in both JavaScript and TypeScript;
// You can add or remove elements dynamically without explicitly resizing the array;
myArr1.push(4);
// myArr1.push('hi'); // TSC prevents you from adding a incompatible value to the array!


// We can get help with map, forEach, reduce functions;
myArr1_v1.map((car: string): string => {
    return car;
});

// Flexible - arrays can still contain multiple different types;
const impDates = [new Date(), '2030-10-10']; // Some of values are date objects, while others are string;
        // Type of impDates is inferred as (string | Date)[]
const impDates2: (Date | string)[] = [new Date()];
impDates2.push('2030-10-10');

// ---------------------------------------------------------------------------------------------------------------------
// You can access array elements using index. Index starts from 0;
console.log("Length of Array: " + myEvenArr.length);
console.log('Element at index 1 is: ' + myEvenArr[1]);

// You can use for loop OR for..in loop to iterate over tuple elements;
for (let i = 0; i < myEvenArr.length; i++) {
    console.log(myEvenArr[i]);
}

for (let i in myOddArr) {       // for-in uses index to loop over the elements!
    console.log(myOddArr[i]);
}

// Using Array.forEach() method;
myEvenArr.forEach((value, index) => {
	console.log(`val: ${value}, index: ${index} type: ${typeof value}`);
});

// ---------------------------------------------------------------------------------------------------------------------

myEvenArr.push(16);
myOddArr.push(17);

// Creating a Tuple
// any type array
// anything that can be assigned to an array of the any type: any[]

// array methods
// 1. concat()	It is used to joins two arrays and returns the combined result.
// 2.	copyWithin()	It copies a sequence of an element within the array.
// 3.	every()	It returns true if every element in the array satisfies the provided testing function.
// 4.	fill()	It fills an array with a static value from the specified start to end index.
// 5.	indexOf()	It returns the index of the matching element in the array, otherwise -1.
// 6.	includes()	It is used to check whether the array contains a certain element or not.
// 7.	Join()	It is used to joins all elements of an array into a string.
// 8.	lastIndexOf()	It returns the last index of an element in the array.
// 9.	pop()	It is used to removes the last elements of the array.
// 10.	push()	It is used to add new elements to the array.
// 11.	reverse()	It is used to reverse the order of an element in the array.
// 12.	shift()	It is used to removes and returns the first element of an array.
// 13.	slice()	It returns the section fo an array in the new array.
// 14.	sort()	It is used to sort the elements of an array.
// 15.	splice()	It is used to add or remove the elements from an array.
// 16.	toString()	It returns the string representation of an array.
// 17.	unshift()	It is used to add one or more elements to the beginning of an array.

// You can pass array to a function; Arrays are passed by reference;
function printArray(myArr: Array<number>) {
    for (let i in myArr) {
        console.log(myArr[i]);
    }
}

// A function can return an array as well;

// https://visualstudiomagazine.com/articles/2016/01/01/exploiting-typescript-arrays.aspx


// ---------------------------------------------------------------------------------------------------------------------
// array spread operator - https://www.javatpoint.com/typescript-arrays



The compiler can determine the array types based on the set of values that are assigned when the arrays are initialized, and it uses the inferred types to follow through to the forEach method.

The compiler is skilled at inferring types, but if you don’t get the results you expect, you can inspect the files that the compiler emits when the declaration option is enabled. This option generates type declaration files, which are used to provide type information when a package is used in another TypeScript project and which are described in detail in Chapter 14.

Here are the types that the compiler has inferred for the arrays in Listing 9-6, which are contained in the index.d.ts file in the dist folder:
...
declare let prices: number[];
declare let names: string[];

