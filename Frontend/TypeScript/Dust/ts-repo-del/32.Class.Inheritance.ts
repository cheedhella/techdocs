// Inheritance
//      A class can inherit another class using extends keyword; TypeScript doesn't support multiple inheritance;

class BaseEmp2 {
    private id: number;			// private 
    constructor(id: number) {
        this.id = id;
    }

    getId(): number {
        return this.id;
    }
}

class Emp5 extends BaseEmp2 {
    private name: string;
    constructor(id: number, name: string) {
        super(id);          // Child class constructor can call the Parent class constructor;
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    toString(): string { // super keyword can also be used to call method in a parent class;
        return 'id: ' + super.getId() + ', name: ' + this.getName();
    }
}

let myE102 = new Emp5(102, "e102");
console.log(myE102.toString());        // id: 102, name: e102 

// ---------------------------------------------------------------------------------------------------------------------------
// A class can implement one or more interfaces;

interface IPerson {
    id: number;
    name: string;
    log(): void;
}

interface IEmployee {
    salary: number;
}

class Emp6 implements IPerson, IEmployee {
    id: number;
    name: string;
    salary: number;

    constructor(id: number, name: string, salary: number) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    log(): void {
        console.log("Id: " + this.id + ", Name: " + this.name + ", salary: " + this.salary);
    }
}

let myE103: IPerson = new Emp6(103, "e103", 10000);
myE103.log();                   // Id: 103, Name: e103, salary: 10000

// let myE104:IEmployee = new Emp6(104, "e104", 15000);
// myE104.log();                // Compiler Error: Property 'log' does not exist on type 'IEmployee'

// ---------------------------------------------------------------------------------------------------------------------------
// Method Overriding
// 	A child class can define its own implementation of a method from the parent class - it is called method overriding;

class Car {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    run(speed: number = 0) {
        console.log(this.name + " is moving at " + speed + " kmph!");
    }
}

class Mercedes extends Car {
    constructor(name: string) {
        super(name);
    }
    run(speed = 150) {
        console.log('A Mercedes started... ');
        super.run(speed);
    }
}

class Honda extends Car {
    constructor(name: string) {
        super(name);
    }
    run(speed = 100) {
        console.log('A Honda started... ');
        super.run(speed);
    }
}

let mercObj = new Mercedes("Mercedes-Benz GLA");
let hondaObj = new Honda("Honda City");
mercObj.run();  // A Mercedes started... Mercedes-Benz GLA is moving at 150 kmph!
hondaObj.run(); // A Honda started... Honda City is moving at 100 kmph!
// ---------------------------------------------------------------------------------------------------------------------------
// If the subclass doesnt have a constructor, you don't need to create one just to call super();
// JavaScript calls super() implicitly by passing all arguments to super class;

class Vehicle2 {
    protected color: string;
    constructor(color: string) {
        this.color = color;
    }
    honk(): void {
        console.log('haha..');
    }
    getColor(): string {
        return this.color;
    }
}
class Car2 extends Vehicle2 {
    honk(): void {
        // console.log(super.color + ' color Car: beeping'); // ERROR: Only public and protected methods of the base class are accessible via the 'super' keyword
        console.log(super.getColor() + ' color Car: beeping');
    }
}
let c2_1: Car2 = new Car2('Red');   // As Car2 doesn't have a constructor, It calls constructor of Vehicle2 directly;
c2_1.honk();                        // Red color Car: beeping
// ---------------------------------------------------------------------------------------------------------------------------
// Method Overriding
//      What will happen when the subclass has the same method as the parent class? This is nothing but method overriding;
//      However, the method from the parent class doesn’t get destroyed; Any method on the subclass can access it using the super keyword;
//      Overriding methods should have the exact same type signature, else the TypeScript compiler will not allow method overriding;
class Vehicle3 {
    honk(): void {
        console.log('Vehicle3..');
    }
}
class Car3 extends Vehicle3 {
    honk(): void {
        console.log(super.honk() + ': beeping');
    }
}
let c3_1: Car3 = new Car3();   // As Car2 doesn't have a constructor, It calls constructor of Vehicle2 directly;
c3_1.honk(); 
// ---------------------------------------------------------------------------------------------------------------------------
// Method Overloading
// You might be familiar with the concept of method overloading in OOP, but it doesn’t exist in JavaScript or TypeScript;
// However there is a concept of function overloading in TypeScript;

// ---------------------------------------------------------------------------------------------------------------------------
