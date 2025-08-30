// In TypeScript, a function can be named function OR anonymous function;

// ---------------------------------------------------------------------------------------------------------------------

console.log('Examples of Named Function...');

// Defining a Named Function
function add_v1(x, y) {
	return x + y;
}
console.log('add_v1(2, 3): ' + add_v1(2, 3));


// You can also specify the type of parameters and return type!
function add_v2(x: number, y: number) : number {
    return x + y;
}
console.log('add_v2(2, 3): ' + add_v2(2, 3));

// ---------------------------------------------------------------------------------------------------------------------
// Anonymous Function
// 		It is a function which is defined as an expression and stored in a variable.
//		So, the function itself doesn't have a name. It can be invoked using variable name in which it is stored in.

console.log("Examples of Anonymous Functions...");
var anonymous_add_v1 = function(x, y) { return x + y; };
console.log('anonymous_add_v1(1, 2): ' + anonymous_add_v1(1, 2));

var anonymous_add_v2 = function(x:number, y:number) : number { return x + y; };
console.log('anonymous_add_v2(1, 2): ' + anonymous_add_v2(1, 2));

// ---------------------------------------------------------------------------------------------------------------------
// Arrow Functions
// We can also define a anonymous function using Fat Arrow => notation.
// function keyword is not required. 
// Parameters are passed in angular brackets () and function body is enclosed within the curly brackets {}.
// Fat arrow separates function parameters and function body.

var anonymous_add_v3 = (x:number, y:number) : number => { return x + y; };
console.log('anonymous_add_v3(1, 2): ' + anonymous_add_v3(1, 2));

// Defining a anonymous function with no parameters
let anonymous_print_v1 = () => console.log("Hello TypeScript"); 
anonymous_print_v1(); // Hello TypeScript

// If the function body consists of only one statement then no need for the curly brackets and the return keyword;
var anonymous_add_v4 = (x:number, y:number) : number => x + y;
console.log('anonymous_add_v4(1, 2): ' + anonymous_add_v4(1, 2));

// -------------------------------------------------------------------------
// Function Parameters
// Parameters are arguments/values that are passed to a function.
// TypeScript compiler expects a function to receive exact number and type of arguments defined in the function signature.
// This is unlike Javascript, which initializes parameters that don't receive a value with undefined!

function add_v3(x: number, y: number, z: number) : number {
	return x + y + z;
}
console.log('add_v3(2, 3, 4): ' + add_v3(2, 3, 4)); // 9
// console.log('add_v3(2, 3): ' + add_v3(2, 3)); // Compiler Error: Expected 3 arguments, but got 2.
// console.log('add_v3(2, 3, 4, 5): ' + add_v3(2, 3, 4, 5)); // Compiler Error: Expected 3 arguments, but got 4.
// console.log('add_v3(2, 3, "hi"): ' + add_v3(2, 3, 'hi')); 
	// Compiler Error: Argument of type 'hi' is not assignable to parameter of type 'number'

// ---------------------------------------------------------------------------------------------------------------------
// Optional Parameters
// TypeScript allows you to mark a parameter as optional(may or may not receive value) by using ? symbol;
// All optional parameters must follow required parameters and should be at the end.

function add_v4(x: number, y: number, z?: number) : number {
	if(z === undefined) {
		return x + y;
	}
	return x + y + z;
}
console.log('add_v4(2, 3, 4): ' + add_v4(2, 3, 4)); // 9
console.log('add_v4(2, 3): ' + add_v4(2, 3)); // 4
// console.log('add_v4(2, 3, 4, 5): ' + add_v4(2, 3, 4, 5)); // Compiler Error: Expected 3 arguments, but got 4.

// ---------------------------------------------------------------------------------------------------------------------
// Default Parameters
// TypeScript allows you to provide default values to parameters.
// So, if the caller does not provide a value to an argument, TypeScript will initializes it with the default value.
// They are implicitly optional. However, if a function signature has a default parameter before a required parameter, it
// can still be called, provided the default parameter is passed a value of undefined.

console.log('Example of default parameters...');
function add_v5(x: number, y: number, z: number = 1) : number {
	return x + y + z;
}
console.log('add_v5(2, 3, 4): ' + add_v5(2, 3, 4)); // 9
console.log('add_v5(2, 3): ' + add_v5(2, 3)); // 4

function add_v6(x: number, y: number, z: number = 1, t: number) : number {
	return x + y + z + t;
}
console.log('add_v6(2, 3, 4, 5): ' + add_v6(2, 3, 4, 5)); // 9
console.log('add_v6(2, 3, undefined, 5): ' + add_v6(2, 3, undefined, 5)); // 4

// ---------------------------------------------------------------------------------------------------------------------
// Rest Parameters
// Required, optional and default parameters all have one thing in common: they talk about one parameter at a time.
// Sometimes, you may not know how many parameters a function will ultimately take.
// In JavaScript, you can use 'arguments' variable to access all arguments inside every function body.
// Same thing can be achieved in TypeScript using Rest Parameters.

// Rest parameters don’t restrict the number of values that you can pass to a function. 
// However, the values passed must all be of the same type.
// In other words, rest parameters act as placeholders for multiple arguments of the same type.

// To declare a rest parameter, the parameter name is prefixed with three periods. 
// Any non-rest parameter should come before the rest parameter.

function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie"); // "Joseph Samuel Lucas MacKinzie"

// ---------------------------------------------------------------------------------------------------------------------
// Type annotations & Type Inferrence for Functions
// In case of a function, TS can't infer the type of arguments, so it defaults to any; Though, it can infer the return type;

const myAdd1 = (x, y) => { // Error: Parameter 'x' implicitly has an 'any' type

}

const myAdd2 = (x: number, y: number) => { // No Error, type of myAdd is inferred as void;

}

const myAdd3 = (x: number, y: number): number => { // Throws Error;
    // A function whose return type is neither void nor any must return a value;
} 

const myAdd4 = (x: number, y: number): number => { // No Error, Type of myAdd is inferred as number;
    return x + y;
}

// When you specify the return type, TypeScript compiler analyses the function body, to check if you are really returning data of that Type;
const myAdd5 = (x: number, y: number): number => { // Error: Type 'boolean' is not assignable to type 'number'
    return true;
}

// TypeScript compiler can infer the return type, based on the function body!
const myAdd6 = (x: number, y: number) => { // No Error, Type of myAdd is inferred as number;
    return x + y;
}

// It is always recommended to specify the return type explicitly, so that TSC can catch errors!
const myAdd7 = (x: number, y: number) => { // You forgot return statement, but compiler won't give you any error!
    x + y;                                // Type of myAdd is wrongly inferred as void;
}

const myAdd8 = (x: number, y: number): number => { // Throws Error! 
    x + y;
}

// Bottom line is: For functions, always use Type annotations with both arguments and return type;
function myAdd9(x: number, y: number): number {
    return x + y;
}
const myAdd10 = function(x: number, y: number): number {
    return x + y;
}
// Arrow Function
const myAdd11 = (x: number, y: number): number => {
    // ....
    return x + y;
}
const myAdd12 = (x: number, y: number): number => x + y;

// ---------------------------------------------------------------------------------------------------------------------------

/*
Destructing with Type Annotations
const todaysWeather = {
    date: new Date(),
    weather: 'sunny'
}
const logWeather = (forecast: {date: Date, weather: string}): void => {
    console.log(forecast.date);
    console.log(forecast.weather);
}

logWeather(todaysWeather);

# We can use ES6 destructuring as a little optimization!
const logWeatherEs6 = ({date, weather}) {
    console.log(date);
    console.log(weather);
}

# How can we use ES6 destructuring, still specifying the types! Replace the varilable with destructuring properties;
const logWeather2 = ({date, weather}: {date: Date, weather: string}): void => { 
    console.log(date);
    console.log(weather);
}
*/

// Annotations around objects
const myUser = {
    name: 'Alex',
    age: 20,
    coordinates: {
        latitude: 0,
        longitude: 15
    },
    setAge(age: number): void {
        this.age = age;
    }
}
// const age: number = myUser.age;
// Destructuring + Type Annotations
// const { age } : { age: number } = myUser; 
// const { name, age } : { name: string; age: number } = myUser; 

// Destructuring
// const {coordinates: {latitude, longitude}} = myUser;
// Destructuring + Type Annotations
const {coordinates: {latitude, longitude}}: {coordinates: {latitude: number, longitude: number}} = myUser;


// ---------------------------------------------------------------------------------------------------------------------

// Built in functions
//		TypeScript provides several built-in functions. Let us look into three popular ones: alert, prompt and confirm;
//		alert function can be used to print an alert message to the screen. Eg: alert("Howdy partner???");
//		prompt function can be used to get some feedback or data points from user. 
//			Eg: let feedback = prompt("Can you gimme some feedback?", "Worst website"); console.log("Feedback = " + feedback);
// 		confirm function can be used to get a true of false response from the user, say before deleting a file.
// 			Eg: let response = confirm("Shall I set the world on fire?"); console.log("Set World on Fire = " + response);

// ---------------------------------------------------------------------------------------------------------------------


