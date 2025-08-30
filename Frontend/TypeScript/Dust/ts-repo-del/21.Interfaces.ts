/*
What is an Interface?
    It is used to define a syntax that an entity(object/array/function/class) must adhere to;

What duck typing?
    TypeScript compiler uses interfaces ONLY for type checking; 
    Interfaces are not present in the generated JavaScritpt, this is called duck typing;

*/

// ---------------------------------------------------------------------------------------------------------------------------
/*
Interface as Type - Interface is used to define the type of an object;
 	It is useful to validate the object, when passing it to a function OR returning it from a function;
*/

const p0 = {
	id: 10,
	name: "p0",
    isMale: true
}

/*
In above example, TSC infers the type of p0 as(it creates an interface implicitly):
{
    id: number;
    name: string;
    isMale: boolean;
}

You will get an error, if you try to add a property which was not specified in the interface OR override 
the value of a property with a value of different type other than what’s specified in the interface;
*/

// p0.newprop = 'hello';  # Property 'newprop' does not exist on type
// p0.id = 'asdf';        # Type 'string' is not assignable to type 'number'

/*
Note: if you want to p0 to have any property, you can change it's type to any, so that TSC will stop type checking;
*/
// ---------------------------------------------------------------------------------------------------------------------------
/* 
If you want to define a function that takes an object of type p0 and returns a string, you 
could do it like below, without using interfaces:
*/

let getInfo = (p1: {
    id: number;
    name: string;
    isMale: boolean;} ): string => {
        return `Id: ${p1.id}, Name: ${p1.name}, isMale: ${p1.isMale}`;
};
console.log(getInfo(p0));   // Id: 10, Name: p0, isMale: true

let p1 = {
	id: 11,
	name: "p1",
    isMale: true,
    email: 'p1@asdf.com'
}
console.log(getInfo(p1));   // No Error! Id: 11, Name: p1, isMale: true
// ---------------------------------------------------------------------------------------------------------------------------
// Above code can get more complicated, if p0 has more properties and if it is used by multiple functions;
// We need to repeatedly define it's type in each function; 
// Solution is use Interface to define the structure of an Object;
interface IPerson {
    id: number;
    name: string;
    isMale: boolean;
}
let getInfo2 = (p: IPerson): string => {
        return `Id: ${p.id}, Name: ${p.name}, isMale: ${p.isMale}`;
};
let p2: IPerson = {
    id: 12,
	name: "p2",
    isMale: true
};
console.log(getInfo2(p2));    // Id: 12, Name: p2, isMale: true
// -----------------
// TSC will throw an error, in case of any missing properties OR additional properties OR properties of the wrong type;
/*
let p3: IPerson = {         // ERROR: 'email' does not exist in type 'IPerson
    id: 13,
	name: "p3",
    isMale: true,
    email: "p13@adf.com"
};

let p4: IPerson = {        // ERROR: Property 'isMale' is missing in type
    id: 14,
	name: "p4"
};

let p5: IPerson = {         // ERROR: Type 'string' is not assignable to type 'boolean'
    id: 15,
	name: "p5",
    isMale: 'unknown'
};
*/

// ---------------------------------------------------------------------------------------------------------------------------
// Optional Parameters
// You can define optional properties in your interfaces with the Elvis operator (?);
// Objects of the interface may or may not define the optional properties;

interface IPerson2 {
    id: number;
    name: string;
    isMale: boolean;
	age?: number;
}
let getInfo3 = (p: IPerson2): string => {
    return `Id: ${p.id}, Name: ${p.name}, isMale: ${p.isMale}, Age: ${p.age}`;
};

const p21: IPerson2 = {
	id: 21,
	name: "p21",
	isMale: true,
	age: 18
};
console.log(getInfo3(p21));     // Id: 21, Name: p21, isMale: true, Age: 1

const p22: IPerson2 = {
	id: 22,
	name: "p22",
	isMale: true
};
console.log(getInfo3(p22));		// Id: 22, Name: p22, isMale: true, Age: undefined

/*
const p23: IPerson2 = {     // ERROR: 'email' does not exist in type 'IPerson2'
	id: 22,
	name: "e22",
	isMale: true,
    age: 18,
	email: "e22@gmail.com"
}
*/

// Let's say, if we are using age property in an arithmetic operation, but its value is undefined;
// So, optional properties can pose serious problems during the program execution;
let getAgeAfter10Yrs = (p: IPerson2): number => {
    return p.age + 10;
}
console.log('p22.age: ' + p22.age);                                 // p22.age: undefined
console.log('p22.age after 10 years: ' + getAgeAfter10Yrs(p22));    // p22.age after 10 years: NaN

// TSC can catch illegal operations on optional properties;
// tsc 21.Interfaces.ts --outDir out --strictNullChecks     // ERROR: Object is possibly 'undefined'

// Another way to fix it is, use Type Assertion(or Type Casting);
let getAgeAfter10Yrs_2 = (p: IPerson2): number => {
    return (p.age as number) + 10;                        // We are saying: if p.age is undefined, convert it to a number;
}
console.log('p22.age: ' + p22.age);                                 // p22.age: undefined
console.log('p22.age after 10 years: ' + getAgeAfter10Yrs_2(p22));  // p22.age after 10 years: NaN

// Another way to fix it is, check if p.age is undefined at runtime, before performing operation;
// ---------------------------------------------------------------------------------------------------------------------------
// Read Only Properties
// You can mark a property as read only; It means once property is assigned a value, it can't be changed!

interface IPerson3 {
	readonly id: number;
	name: string;
	isMale: boolean;
}
let getInfo4 = (p: IPerson3): string => {
    return `Id: ${p.id}, Name: ${p.name}, isMale: ${p.isMale}`;
};

const p31: IPerson3 = {
	id: 31,
	name: "p31",
    isMale: true
}
console.log(getInfo4(p31)); 	// Id: 31, Name: ep31, isMale: true
// p31.id = 32; 		// Compiler Error: Cannot assign to 'id' because it is a read-only property