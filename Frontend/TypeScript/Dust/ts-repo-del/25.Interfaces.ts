// https://medium.com/jspoint/typescript-interfaces-4a2af07c8070

// Interface can extend one or more interfaces;
interface IPerson {
    id: number;
    name: string;
}

interface IEmployee extends IPerson {
    salary: number;
}

// Objects of IEmployee must include all the properties and methods of IPerson and IEmployee; 
// Otherwise, TS compiler will throw an error!
let mye1: IEmployee = {
	id: 101,
	name: "Bill",
	salary: 10000
}
console.log(mye1);

/*
// Compiler Error: Property 'salary' is missing in type
let mye2: IEmployee = {
	id: 102,
	name: "Bill2"
}
console.log(mye2);
*/

// ---------------------------------------------------------------------------------------------------------------------------
// An interface can also extend a class to represent a type.
/*
class IPerson2 {
	id: number;
	name: string;
}

interface IEmployee extends IPerson2 {
    salary: number;
}

let e3:IEmployee = { id: 103, name: "e103", salary: 20000 }
logPerson(e3);
*/

/*
What is interface?
	It is used to define a syntax that an entity(object/array/function/?class?) must adhere to.
	It only declares the properties, methods. It is the responsibility of deriving class to define them.
	interface keyword is used to declare an interface.
*/

// ---------------------------------------------------------------------------------------------------------------------------

/*
An interface can also have function properties;
interface IPerson {
	...
	getSalary: (salary: number) => number;
}

// An interface can be extended by other interfaces. 
// TypeScript also allows the interface to inherit from multiple interfaces.
// An interface is part of typescript only an interface can’t be converted to JavaScript.
TypeScript interface refers to the syntax that a system needs to follow. 
It is a virtual structure that exists within the context of typescript. 
It is mainly used for type checking purposes. 
It is simply a structural contract that defines the properties of an object is having like name and its type.
 An interface also defines the methods and events. It contains the only declaration of the members. 
 Interface members should be declared by the derived class.

 */
// ---------------------------------------------------------------------------------------------------------------------------



// ---------------------------------------------------------------------------------------------------------------------------
