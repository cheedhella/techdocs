/*
What is Tuple?
	It is an array of elements of different data types;

Specifying the type is obligatory; otherwise, the TypeScript compiler can't distinguish between tuples and arrays, and assumes an array by default. Tuples elements can be accessed through the usual array syntax, as follows:


	*/

// ---------------------------------------------------------------------------------------------------------------------
// Creating a Tuple
let myEmpTuple: [number, string] = [1, "Steve"]; // First member shoule be number and second one should be string;
let myTuple = [101, "JavaTpoint", 105, "Abhishek"]; 
console.log(myEmpTuple);
console.log(myTuple);

var result: [number, boolean];
var resultWithValue: [number, boolean] = [12, true];
3
describing destructuring in the Destructuring and spread section, we will see a smarter way to access tuples elements.

// ---------------------------------------------------------------------------------------------------------------------
// You can access tuple elements using index, similar to array. Index starts from 0;
console.log("Length of Tuple: " + myTuple.length);
console.log('Element at index 1 is: ' + myTuple[1]);

// You can use for loop OR for..in loop to iterate over tuple elements;
console.log('Iterating using for loop');
for (let i = 0; i < myEmpTuple.length; i++) {
    console.log(myEmpTuple[i]);
}

console.log('Iterating using for..in loop');
for (let i in myTuple) {
    console.log(myTuple[i]);
}

// Using Array.forEach() method;
myEmpTuple.forEach((value, index) => {
	console.log(`val: ${value}, index: ${index} type: ${typeof value}`);
});

// ---------------------------------------------------------------------------------------------------------------------
// Tuple allows 2 operations: push(), pop(); You can also use other methods available in the Array;
// push() - It is used to add an element to the tuple;
// pop() - It is used to remove an element from the tuple;
myTuple.pop();
myTuple.push('Robert');
myTuple.push(108, 'Neo'); // Adds both the elements to the tuple;

// If you want to update an element, use index operator;
myTuple[1] = "TypeScript";
console.log(myTuple);

// Tuple allows only number OR string types;
// Below throws this error: Argument of type 'true' is not assignable to parameter of type 'number | string'.
// myEmpTuple.push(true);
// myTuple.push(true);

// ---------------------------------------------------------------------------------------------------------------------
// Destructuring a Tuple
let [id, empName] = myEmpTuple;
console.log(id);
console.log(empName);

// ---------------------------------------------------------------------------------------------------------------------
// Passing Tuple to a Function
function displayTuple(myTupleParam: any[]) {
	console.log(myTupleParam);
}
displayTuple(myEmpTuple);

// ---------------------------------------------------------------------------------------------------------------------