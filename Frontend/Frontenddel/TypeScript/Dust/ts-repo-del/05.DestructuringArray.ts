// --------------------------------------------------------------------------------
// Old way of extracting data from Array 
// --------------------------------------------------------------------------------

let eg0 = ['budi', 'sinta', 'lusi'];
let eg0_s1 = eg0[0];
let eg0_s2 = eg0[1];
let eg0_s3 = eg0[2];
console.log('Extracted data using array index: eg0_s1: ' + eg0_s1 + ', eg0_s2: ' + eg0_s2 + ', eg0_s3: ' + eg0_s3);

// --------------------------------------------------------------------------------
// Array Destructuring 
// --------------------------------------------------------------------------------

let eg1 = ['budi', 'sinta', 'lusi'];
let [eg1_s1, eg1_s2, eg1_s3] = eg1;
console.log('Extracted data using array destructuring: eg1_s1: ' + eg1_s1 + ', eg1_s2: ' + eg1_s2 + ', eg1_s3: ' + eg1_s3);

// --------------------------------------------------------------------------------
// You can also pre-declare the variables;
// --------------------------------------------------------------------------------

let eg2 = ['budi', 'sinta', 'lusi'];
let eg2_s1, eg2_s2, eg2_s3;
[eg2_s1, eg2_s2, eg2_s3] = eg2;
console.log('Array destructuring: eg2_s1: ' + eg2_s1 + ', eg2_s2: ' + eg2_s2 + ', eg2_s3: ' + eg2_s3);

// --------------------------------------------------------------------------------
// You can also ignore few elements;
// --------------------------------------------------------------------------------
console.log('Array destructuring - exacting only few elements...');
let eg3 = ['budi', 'sinta', 'lusi'];
let eg3_s1, eg3_s2, eg3_s3;

// get only first element
[eg3_s1] = eg3;
console.log('Extracting first element: ' + eg3_s1); 	// 'budi'

// get only first 2 elements
[eg3_s1, eg3_s2] = eg3;
console.log('Extracting first 2 elements: ' + eg3_s1 + ", " + eg3_s2); 	// 'budi', 'sinta'

// ignore the middle element
[eg3_s1, , eg3_s3] = eg3;
console.log('Extracting all elements, except middle: ' + eg3_s1 + ", " + eg3_s3); // 'budi', 'lusi'

// get only 3rd element
[, , eg3_s3] = eg3;
console.log('Extracting only 3rd element: ' + eg3_s3); // lusi'

// --------------------------------------------------------------------------------
// Catch the rest
// You can use ... to catch the rest of elements and store it as array.
// --------------------------------------------------------------------------------
let eg4 = ['budi', 'sinta', 'lusi'];
let [eg4_s1, ...eg4_rest] = eg4;
console.log('Example of Catch the rest...'); 
console.log('First: ' + eg4_s1); 	// 'budi'
console.log('Rest: ' + eg4_rest); 	// 'sinta', 'lusi' // Note: It's not an array

// --------------------------------------------------------------------------------
// Default values
// You can assign default value in case array elements doesn't exist
// --------------------------------------------------------------------------------
let eg5 = ['budi'];
let [eg5_s1, eg5_s2='daebak', eg5_s3='gomawo'] = eg5;
console.log('Extracting with default values: eg5_s1 = ' + eg5_s1 + ', eg5_s2 = ' + eg5_s2 + ', eg5_s3 = ' + eg5_s3);

// --------------------------------------------------------------------------------
// Destructure using a Regular Expression
// --------------------------------------------------------------------------------
console.log('Destructuring using a RE...');
let [totalDate, year, month, day] = /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec('2017-09-13'); 
console.log("totalDate - " + totalDate + ", Year: " + year + " Month: " + month + " Day: " + day);

// exec() returns null if the regular expression doesn’t match.
// Destructuring fails with error, when exec() returns null.
// You can't handle null via default values, which is why you must use the || operator to provide default values.
[totalDate, year, month, day] = /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec('2017-09-1') || ['', '', '', ''];
console.log("totalDate - " + totalDate + ", Year: " + year + " Month: " + month + " Day: " + day);

// --------------------------------------------------------------------------------
// Swap Variables
// --------------------------------------------------------------------------------
console.log('We can use destructing techinique to swap 2 variables without extra element:');
let eg6_s1 = 'budi';
let eg6_s2 = 'sinta';
console.log('Before swapping: eg6_s1 = ' + eg6_s1 + ', eg6_s2 = ' + eg6_s2); // 'budi', 'sinta'
[eg6_s2, eg6_s1] = [eg6_s1, eg6_s2];
console.log('After swapping: eg6_s1 = ' + eg6_s1 + ', eg6_s2 = ' + eg6_s2); // 'sinta', 'budi'

// --------------------------------------------------------------------------------
// You can use destructing in a function parameter
// --------------------------------------------------------------------------------
/*
let eg7 = ['budi', 'sinta', 'lusi']; // TODO: It is not compiling!!

function printStudents([eg7_s1, eg7_s2, eg7_s3]: [string, string, string]) {
	console.log(eg7_s1);
	console.log(eg7_s2);
};

printStudents(eg7); // Output: 'budi', 'sinta'
*/


// --------------------------------------------------------------------------------
// You can destructure the array returned by a function
// --------------------------------------------------------------------------------
let eg8 = 'budi john doe';
let [eg8_s1, ...eg8_rest] = eg8.split(' ');
console.log(eg8_s1); // 'budi'
console.log(eg8_rest); // ['john', 'doe']


