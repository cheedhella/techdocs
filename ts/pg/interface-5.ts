// ----------------------------------------------------------------------------------------------------------------
// Interface as an Array Type
//      Interface can be used to define the type of an array, where you can define the type of index as well as values;

// Example 1: interface NumList defines a number array with index as number type and value as number type;
interface NumList {
	[index: number]: number
}
let numArr: NumList = [1, 2, 3];
// console.log(numArr.length);  // ERROR: Property 'length' does not exist on type 'NumList'
// numArr.push(2); 				// ERROR: Property 'push' does not exist on type 'NumList'
numArr[4] = 4;
console.log(numArr); 			// [1, 2, 3, empty, 4]

// let numArr2: NumList = ['1', '2', '3']; // ERROR: Type 'string' is not assignable to type 'number'
// -------------------------
// Example 2:
// Declare indexable type
interface SimpleObject {
    [key: string]: any;
}
// Declare a new object of type SimpleObject
let ross: SimpleObject = { name: 'Ross Geller', age: 32 };
let monica: SimpleObject = { name: 'Monica Geller', age: 28 };

console.log(ross);          // { name: 'Ross Geller', age: 32 }
console.log(monica);        // { name: 'Monica Geller', age: 28 }
// -------------------------
// Example 3
interface LapTimes {
    [key: number]: number;
}
let ross2: LapTimes = [10.5, 11.6, 10.9];
let monica2: LapTimes = {2: 10.5, 4: 11.6, 6: 10.9};
let joy: LapTimes = {'2': 10.5, '4': 11.6, '6': 10.9};
// let rachel: LapTimes = {'one': 10.5, 'two': 11.6, 'three': 10.9}; // ERROR: Type '{ one: number; two: number; three: number; }' is not assignable to type 'LapTimes';

// -------------------------
// Example 4
// interface IStringList defines a string array with index as string type and value as string type.
interface IStringList {
	[index: string]: string
}
let strArr: IStringList = {};
strArr["TS"] = "TypeScript";
strArr["JS"] = "JavaScript";
console.log(strArr); 				// {TS: "TypeScript", JS: "JavaScript"}
// -------------------------
// Example 5
// Indexable type can also some mandatory properties and some optional properties;
interface LapTimes2 {
    name: string,           // mandatory
    age?: number,           // optional
    [key: number]: number
}

// valid
let ross3: LapTimes2 = {
    name: 'Ross Geller',
    age: 22,
    1: 10,
    '2': 11.2
};

// ERROR: Type 'string' is not assignable to type 'number'
/*
let monica3: LapTimes2 = {
    name: 'Ross Geller',
    age: '22',
    1: 10,
    '2': 11.2
};
*/

// ERROR: 'gender' does not exist in type 'LapTimes2'
/*
let monica4: LapTimes2 = {
    name: 'Ross Geller',
    age: 22,
    gender: 'male',
    1: 10,
    '2': 11.2
};
*/

// ERROR: Property 'name' is missing 
/*
let monica5: LapTimes2 = {
    age: 22,
    1: 10,
    '2': 11.2
};
*/