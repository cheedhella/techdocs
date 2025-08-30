/*
What is a Class?
    It encapsulates the data of an object;
    A Class can consists of the following: Constructor, Properties, Methods;

Constructor
    - It is a special type of function, which is responsible for initializing the class variables;
	- It is called when you create an object of the class using new keyword;
    - It is not necessary for a class to have a constructor; You can skip it, if you don't wish to initialize any properties;
    - Only one constructor is allowed in a Class;
    - Inside the constructor, members of the class can be accessed using this keyword;

Creating Object of a Class
    - You can use 'new' keyword to create an object of a class;
    - Syntax: var object_name = new class_name([ arguments ])

Access Properties and Methods of an Object:
    - You can use dot(.) notation to access members of an object;

this - It refers to the current instance of the class;
*/

// ---------------------------------------------------------------------------------------------------------------------------
// Class without Constructor
class Emp31_1 {
    id: number;
    name: string;
}

let emp31_1 = new Emp31_1();
emp31_1.id = 101;
emp31_1.name = 'e101';
console.log(emp31_1);              // {id: 101, name: "e101"}

// ---------------------------------------------------------------------------------------------------------------------------
// Class with Constructor
class Emp31_2 {
	private id: number;
	private name: string;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
    }

    getId(): number {
    	return this.id;
    }

    getName(): string {
        return this.name;
    }
}

let emp31_2 = new Emp31_2(102, "e102");
console.log(emp31_2);                      // {id: 102, name: "e102"}

// ---------------------------------------------------------------------------------------------------------------------------
// If you carefully examine the constructor function of the classes we have created so far:
// First, we need to define the fields of the class with types, then we need to mention the parameters of the constructor function with types and then we can initialize their values;
// So much of boilerplate code, not very productive!
// Luckily, TypeScript provides a handly little syntax to define constructor function parameters and assign field values in one go;

// Emp31_3 is same as Emp31_2;
class Emp31_3 {
	constructor(private id: number, private name: string) { // Note: Just like properties with default values, these are initialized even before constructor function is executed;

    }

    getId(): number {
    	return this.id;
    }

    getName(): string {
        return this.name;
    }
}

let emp31_3 = new Emp31_3(103, "e103");
console.log(emp31_3);                      // {id: 103, name: "e103"} 
// ---------------------------------------------------------------------------------------------------------------------------
// Default property values
//      You can specify a default value for a property, a value that is assigned to the property even before the constructor function is called;
//      You don't need to specify the Type Annotation for a property with initial value; TypeScript compiler can infer the type, from the default initial value;
class Emp31_4 {
    private id: number = 1;
	private name: string = 'defaultName';
    
    constructor(id: number, name?: string) {
        this.id = id;
        if(name !== undefined) {
            this.name = name;
        }
    }

    getId(): number {
    	return this.id;
    }

    getName(): string {
        return this.name;
    }
}

console.log(new Emp31_4(104, "e104"));         // {id: 104, name: "e104"}
console.log(new Emp31_4(105));                 // {id: 105, name: "defaultName"}
// ---------------------------------------------------------------------------------------------------------------------------
// Get and Set Accessors
//  Instead of having fullName as a proeprty, you can create set and get accessor methods for it;
class Emp31_5 {
    private fname: string;
    private lname: string;

    constructor(fname: string, lname: string) {
        this.fname = fname;
        this.lname = lname;
    }

    public get fullName(): string {
        return this.fname + ' ' + this.lname;
    }

    public set fullName(name: string) {
        // Advantage of it is you can validate name as a whole, before setting individual properties;
        if(name.split(' ').length != 2) {
            throw "Invalid name";
        }
        this.fname = name.split(' ')[0];
        this.lname = name.split(' ')[1];
    }
}
let emp31_5_1 = new Emp31_5("e105f", "e105l");
console.log(emp31_5_1);
emp31_5_1.fullName = 'newfirst newlast';        // Calls set emp31_5_1.fullName()
console.log(emp31_5_1.fullName);                // Calls get emp31_5_1.fullName()

/*
Note:
> tsc 31.Class.ts --outDir out          # ERROR: Accessors are only available when targeting ECMAScript 5 and higher;
> tsc -t es5 31.Class.ts --outDir out

You can also specify target JavaScript verion in tsconfig.json file;
{
  "compilerOptions": {
    "target": "es5"
  }
}
*/

// ----------------------
class Emp31_6 {
    private _dob: Date;                 // Internally, it is a Date object; But, user can get it as a string and set it using a string;

    constructor(public name: string, dobRaw: string) {
        this._dob = new Date(dobRaw);
    }

    get dob(): string {
        const date = this._dob.getDate();
        const month = this._dob.getMonth() + 1;
        const year = this._dob.getFullYear();
        return `${month}-${date}-${year}`; // mm-dd-yyyy
    }

    set dob(dobRaw: string) {
        this._dob = new Date(dobRaw);
    }
}
let emp31_6_1 = new Emp31_6('e106', '10-14-1996');
console.log(emp31_6_1.dob);                         // 10-14-1996
emp31_6_1.dob = '11-15-1997';
console.log(emp31_6_1.dob);                         // 11-15-1997

// ---------------------------------------------------------------------------------------------------------------------------
// Instance members and this
class Emp31_7 {
    constructor(public name: string) {

    }
    // Instance method
    getName(): string {
        return this.name;
    }

    // Arrow method
    /*
        In the case of arrow functions, this value is borrowed from the parent scope of the function;
        Hence, it doesn’t matter how the function is called, it depends on the position of the function, 
        since this value in the function is the this value in the enclosing lexical scope;
    */
    getName2 = (): string => {
        return this.name;
    }
}
let emp31_7_1 = new Emp31_7('e101');
console.log(emp31_7_1.getName());           // e101
console.log(emp31_7_1.getName2());          // e101
// save emp31_7_1.getName in emp31_7_1_Fn
let emp31_7_1_Fn = emp31_7_1.getName;
console.log(emp31_7_1_Fn());                // undefined

// emp31_7_1.getName() -> In this case, getName() is called on emp31_7_1, so, this inside getName() refers to emp31_7_1 object;
// emp31_7_1_Fn()      -> In this case, getName() is called without any owner object, so, this inside getName() refers to global window object; As window object doesn't have any property named 'name', it prints undefined;

// We can fix it using bind() method as follows!
class Emp31_8 {
    constructor(public name: string) {
        this.getName = this.getName.bind(this);     // We are creating getName property on the instance itself!
    }
    // Instance method
    getName(): string {
        return this.name;
    }
    // Arrow method
    getName2 = (): string => {
        return this.name;
    }
}
let emp31_8_1 = new Emp31_8('e108');
console.log(emp31_8_1.getName());            // e108
console.log(emp31_8_1.getName2());           // e108

// save emp31_8_1.getName in emp31_8_1_Fn
let emp31_8_1_Fn = emp31_8_1.getName;
console.log(emp31_8_1_Fn());                 // e108
// ---------------------------------------------------------------------------------------------------------------------------
// Static members
/*
	- static members of a class are always accessed using the class name and dot notation; without creating an object, 
    - A class or constructor cannot be static in TypeScript.
    - only one copy of the static variable and it is shared b/w all objects of that class;
*/

class Circle31 {
    static PI: number = 3.14;

    constructor(public radius: number) {

    }
    static calculateArea(radius:number) {
        return this.PI * radius * radius; 	// A static method can access static members either using this keyword OR class name;
    }

    calculateCircumference(radius: number): number { 
        // return 2 * this.PI * radius;        // ERROR: Property 'PI' is a static member of type 'Circle31'
        return 2 * Circle31.PI * radius;
    }
}
console.log('Circle31.PI: ' + Circle31.PI);             // Circle.PI: 3.14
console.log('Area: ' + Circle31.calculateArea(5));      // Area: 78.5

let c31_1 = new Circle31(3);
console.log('Circumference: ' + c31_1.calculateCircumference(5)); // Circumference: 31.400000000000002
// You can't access staic members using an object;
// console.log('c31_1.PI: ' + c31_1.PI);           // ERROR: Property 'PI' is a static member of type 'Circle31'
// console.log('Area: ' + c31_1.calculateArea(5)); // ERROR: You can't call static method using an object!

// ---------------------------------------------------------------------------------------------------------------------------
