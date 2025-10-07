// ----------------------------------------------------------------------------------------
// Old way of accessing object properties!
// ----------------------------------------------------------------------------------------
let o1 = {
	p1: 'foo',
	p2: 17,
	p3: 'bar'
};

let o1_p1 = o1.p1;
let o1_p2 = o1.p2;
console.log('Old way of accessing object properties: p1 - ' + o1_p1 + ', p2 - ' + o1_p2);

// ----------------------------------------------------------------------------------------
// ES6/TypeScript supports even better way of doing it, in a cleaner way!
// ----------------------------------------------------------------------------------------

let {p1, p2} = o1; 	// value of o2.p1 is assigned to p1 and o2.p2 is assigned to p2
					// If you declare a property which doesn't exist in o2, code will not compile!
console.log('Typescript way of accessing object properties: p1 - ' + p1 + ', p2 - ' + p2);

// ----------------------------------------------------------------------------------------
// Change variable names! Also called property renaming!
// ----------------------------------------------------------------------------------------
let { p1: o2_p1, p2: o2_p2 } = o1;
console.log('Using custom variable names: o2_p1 - ' + o2_p1 + ', o2_p2 - ' + o2_p2);

// ----------------------------------------------------------------------------------------
// Catch the rest
// ----------------------------------------------------------------------------------------

let { p1: o3_p1, ...rest } = o1;
console.log('Catch the rest: ' + rest.p2 + ', ' + rest.p3);

// ----------------------------------------------------------------------------------------
// Destructuring nested objects
// ----------------------------------------------------------------------------------------
let o5 = {
	name: "foo",
	department: "bar",
	hobbies: ['cricket', 'reading'],
	favCricketer: {
		first: {
			name: 'Sachin',
			comment: 'excellent batsman'
		},
		second: {
			name: 'Dhoni',
			comment: 'excellent keeper'
		}
	}
};

let { favCricketer: {first, second} } = o5;
console.log('Extracting data from nested objects: ' + first.name + ', ' + second.name);

// ----------------------------------------------------------------------------------------
// Destructuring nested objects - using custom names
// ----------------------------------------------------------------------------------------
let { favCricketer: {first : fav1, second: fav2} } = o5; 
// o5.favCricketer.first is assigned to fav1 and o5.favCricketer.second is assigned to fav2
console.log('Extracting data from nested objects using custom names: ' + fav1.name + ', ' + fav2.name);

// ----------------------------------------------------------------------------------------
// Mixed Destructuring - extracting data from an object and array
// ----------------------------------------------------------------------------------------
let { favCricketer: {first : fav3, second: fav4}, hobbies: [h1, h2] } = o5; 
console.log('Mixed Destructuring: ' + fav1.name + ', ' + fav2.name + '; Hobbies: ' + h1 + ', ' + h2);

// ----------------------------------------------------------------------------------------
// Destructuring an array of objects
// ----------------------------------------------------------------------------------------
let users = [{name: 'foo', dept: 'd1'}, {name: 'bar', dept: 'd2'}, {name: 'geo', dept: 'd3'}];
for(let {name: n, dept: d} of users) {
	console.log('name: ' + n + ', dept: ' + d);
}

// ----------------------------------------------------------------------------------------
// You can use destructure the object passed to a function as an argument!
// ----------------------------------------------------------------------------------------

function printBasicInfo({ p1, p2, p4 = 'study' }) {
	console.log('Function parameter: p1 - ' + p1 + ', p2 - ' + p2 + ', p4 - ' + p4);
}

printBasicInfo(o1);