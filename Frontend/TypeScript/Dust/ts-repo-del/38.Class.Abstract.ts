/*
What is Abstraction?
    The main goal of abstraction is to hide the unnecessary details from the user.
    For example, making coffee with a coffee machine. You only need to know about it's input and how to use it.
    You don't need to know how coffee machine works internally to brew a cup of delicious coffee.

    In TypeScript, abstraction is accomplished using Abstract classes and interfaces.

Abstract Class
    - A class which typically includes one or more abstract methods;
    - You can't create an instance of abstract class, they are mainly for inheritance;
    - The class which extends the abstract class must define all the abstract methods;
    - You can use 'abstract' keyword to define an abstract class;    
*/

abstract class BaseEmployee {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
 
    abstract doWork(): void;
}
 
class Employee extends BaseEmployee {
    constructor(name: string) {
        super(name);        // Class which implements an abstract class must call super() in the constructor;
    }
 
    doWork(): void {
        console.log(`${this.name} doing work...`);
    }
}
 
let e1 = new Employee('Ryan');
e1.doWork(); // Output: Ryan doing work...
// ---------------------------------------------------------------------------------------------------------------------------

// Abstract class can also contain an abstract property;

abstract class BaseEmployee2 {
    abstract name: string;
    doWork(): void {
        console.log(`${this.name} doing work...`);
    }
}

class Employee2 extends BaseEmployee2 {
    name: string;
    constructor(name: string) {
        super();        // must call super()
        this.name = name;
    }
}

let e2: BaseEmployee2 = new Employee2("James");
e2.doWork(); // Output: James doing work...
// ---------------------------------------------------------------------------------------------------------------------------

// An abstract class can implement one or more interfaces.

interface IName {
    name: string;
}
 
interface IWork {
    doWork(): void;
}
 
abstract class BaseEmployee3 implements IName, IWork {
    name: string;
 
    constructor(name: string) {
        this.name = name;
    }
 
    abstract doWork(): void;
}
 
class Employee3 extends BaseEmployee3 {
    constructor(name: string) {
        super(name);
    }
 
    doWork(): void {
        console.log(`${this.name} doing work...`);
    }
}
 
let e3: IWork = new Employee3('Ryan');
e3.doWork(); // Output: Ryan doing work...

// ---------------------------------------------------------------------------------------------------------------------------

/*



interface IEmployee {
    id: number;
	name: string;
	salary: number;
    getSalary:(number)=>number;
}

class Employee implements IEmployee { 
    empCode: number;
    name: string;

    constructor(code: number, name: string) { 
                this.empCode = code;
                this.name = name;
    }

    getSalary(empCode:number):number { 
        return 20000;
    }
}


let emp = new Employee(1, "Steve");
*/


/*



You can only use properties and methods specific to the object type.

the IEmployee interface is implemented in the Employee class using the the implement keyword. The implementing class should strictly define the properties and the function with the same name and data type. If the implementing class does not follow the structure, then the compiler will show an error.

// Of course, the implementing class can define extra properties and methods, but at least it must define all the members of an 
interface.
*/
/*




// TypeScript classes can be extended to create new classes with inheritance, using the keyword extends

class Person {
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }
}

class Employee extends Person {
    empCode: number;
    
    constructor(empcode: number, name:string) {
        super(name);
        this.empCode = empcode;
    }
    
    displayName():void {
        console.log("Name = " + this.name +  ", Employee Code = " + this.empCode);
    }
}

let emp = new Employee(100, "Bill");
emp.displayName(); // Name = Bill, Employee Code = 100

// The super keyword is used to call the parent constructor and passes the property values.
// We must call super() method first before assigning values to properties in the constructor of the derived class.





*/







/*
interface IPerson { 
   firstName:string, 
   lastName:string, 
   sayHi: ()=>string 
} 

// customer object is of the type IPerson
var customer:IPerson = {
   firstName:"Tom",
   lastName:"Hanks", 
   sayHi: ():string =>{return "Hi, I am a customer!"} 
}
console.log("Customer Object: " + customer.firstName + ", " + customer.lastName + ", " + customer.sayHi());

// employee object is of the type IPerson
var employee:IPerson = { 
   firstName:"Jim",
   lastName:"Blakes", 
   sayHi: ():string =>{return "Hi, I am an employee!"} 
}
console.log("Employee Object: " + employee.firstName + ", " + employee.lastName + ", " + employee.sayHi());

https://code.tutsplus.com/tutorials/typescript-for-beginners-part-3-interfaces--cms-29439
https://www.typescriptlang.org/docs/handbook/interfaces.html
https://blog.logrocket.com/interfaces-in-typescript-what-are-they-and-how-do-we-use-them-befbc69b38b3/
*/
