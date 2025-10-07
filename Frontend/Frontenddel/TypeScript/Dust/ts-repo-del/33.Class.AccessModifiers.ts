/*
What is Access Modifier?
	Class uses access modifiers to control visibility of it's data members;
	TypeScript supports 3 type of access modifiers: public, protected, private;

	public
		- By default, all members of a class are public.
		- Public members can be accessed from anywhere without any restrictions.

	protected
		- Protected members are visible to members of that class and derived class;

	private
        - Private members are visible only to the members of that class.

	They certainly doesn’t exist in JavaScript;
	All properties of an object are public by default and can be accessed, modified, or deleted by anyone;
	However, TypeScript does support these access modifiers;
	These do not change how JavaScript behaves but it adds access restrictions on the properties and methods during the compilation;

	ES6 Class vs TypeScript Class
		Class in ES6 doesn't support access modifiers, where as TypeScript class supports them!
*/

// ---------------------------------------------------------------------------------------------------------------------------
class BaseEmp33_1 {
	private id: number;			// private 
	protected salary: number; 	// protected
	name: string; 				// public
	
	constructor(id: number, name: string, salary: number) {
		this.id = id;
		this.name = name;
		this.salary = salary;
    }

	getId(): number {
		return this.id;
	}
}

class Emp33_1 extends BaseEmp33_1 {
	logInfo(): void {
		// console.log(`Id: ${this.id}, Name: ${this.name}, Salary: ${this.salary}`); // ERROR: Property 'id' is private and only accessible within class 'BaseEmployee'
		console.log(`Id: ${this.getId()}, Name: ${this.name}, Salary: ${this.salary}`); 
    }
}

let myEmp33_1_1 = new Emp33_1(101, "e101", 10000);
// myEmp33_1_1.id = 123; 			// ERROR: Property 'id' is private and only accessible within class 'BaseEmployee'
// myEmp33_1_1.salary = 15000; 		// ERROR: Property 'salary' is protected and only accessible within class 'BaseEmployee' and its subclasses
myEmp33_1_1.name = 'myEmp33_1_1';
myEmp33_1_1.logInfo();				// Id: 101, Name: myEmp33_1_1, Salary: 10000

// ---------------------------------------------------------------------------------------------------------------------------
class BaseEmp33_2 {
	id: number; 
	salary: number;
	name: string;
	
	constructor(id: number, name: string, salary: number) {
		this.id = id;
		this.name = name;
		this.salary = salary;
    }

	private getId(): number {				// private
		return this.id;
	}

	protected getSalary(): number {			// protected
		return this.salary;
	}

	getName(): string {						// public
		return this.name;
	}
}

class Emp33_2 extends BaseEmp33_2 {
	logInfo(): void {
		// console.log(`Id: ${this.getId()}, Name: ${this.getName()}, Salary: ${this.getSalary()}`); // ERROR: Property 'getId' is private and only accessible within class 'BaseEmp33_2'
		console.log(`Id: ${this.id}, Name: ${this.getName()}, Salary: ${this.getSalary()}`);
	}
}

let myEmp33_2_1 = new Emp33_2(101, "e101", 10000);
// console.log(myEmp33_2_1.getId());			// ERROR: Property 'getId' is private and only accessible within class 'BaseEmp33_2'
// console.log(myEmp33_2_1.getSalary());		// ERROR: Property 'getSalary' is protected and only accessible within class 'BaseEmp33_2' and its subclasses
console.log(`Id: ${myEmp33_2_1.id}, Name: ${myEmp33_2_1.getName()}, Salary: ${myEmp33_2_1.salary}`); // Id: 101, Name: e101, Salary: 10000

// ---------------------------------------------------------------------------------------------------------------------------
class Emp33_3 {
	constructor(public name: string, private age: number) {

	}
}
let myEmp33_3_1 = new Emp33_3("e101", 23);
console.log(myEmp33_3_1.name);
// console.log(myEmp33_3_1.age);	// ERROR: Property 'age' is private and only accessible within class 'Emp33_3'
console.log(myEmp33_3_1);			// Emp33_3 {name: "e101", age: 23}

/*
If you are wondering why age property is visible in the output since it’s private, here is why:
TypeScript does not change how JavaScript behaves, it can only enforce the rules during code compilations;
Therefore myEmp33_3_1.age might be inaccessible in the TypeScript program but it will be always accessible at the runtime;
*/