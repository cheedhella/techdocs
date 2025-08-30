/*
What is Type Guard?
    It is a conditional statement, that checks the type of a variable;
    If the check passes, it narrows down the type of the variable within the scope of the block, where the check was performed;
    This is crucial, as it allows you to write safer code, by ensuring that you're using variables according to their actual types;

There are 5 major type guards:
    - typeof 
    - instanceof
    - in
    - Equality narrowing type guard
    - Custom type guard with predicate
*/

// typeof - It is one of the most common ways to narrow down types in TS;
// It checks whether a variable is of a certain primitive type(boolean, number, string etc) or not;
function processInput(input: string | number) { // input can be either string or number;
    if (typeof input === 'string') {
        return input.toUpperCase();             // TS knows 'input' is a string here!
    } else {
        return input.toFixed(2);                // TS knows 'input' is a number here
    }
}

// instanceof -  It checks whether an object is an instance of a particular class;
class Dog {
    bark() {
        return 'Woof!';
    }
}

class Cat {
    purr() {
        return 'Meow!';
    }
}

function makeSound(animal: Dog | Cat) {
    if (animal instanceof Dog) {
        return animal.bark();  // TS knows 'animal' is a Dog
    } else {
        return animal.purr();  // TS knows 'animal' is a Cat
    }
}


// in - It checks if an object contains a specific attribute or not;
function makeSound2(animal: Dog | Cat) {
    if ('bark' in animal) {
        return animal.bark();  // TS knows 'animal' is a Dog
    } else if ('purr' in animal) {
        return animal.purr();  // TS knows 'animal' is a Cat
    }
}


interface Kid {
    ID: string;
}
interface Adult {
    SSN: number;
}
interface Person {
    name: string;
    age: number;
}

const getIdentifier = (person: Kid | Adult | Person) => {
    if ('name' in person) {
        return person.name;
    }
    else if ('ID' in person) {
        return person.ID
    }
    return person.SSN;
}

let p51_1: Kid | Adult | Person = {
    name: 'Britney',
    age: 6
};

console.log(getIdentifier(p51_1));


// Equality narrowing type guard
function getValues(a: number | string, b: string) {
    if (a === b) {
        // TS narrows the Type of a and b to string, in this block;
        console.log(typeof a); // string
    } else {
        // No narrowing, type remains number or string;
        console.log(typeof a);
    }
}

// Custom type guard with predicate
// Developers can wrote their own type guards by defining a function 
// that returns a boolean value indicating whether a value is of a 
// particular type or not;
interface p51_Square {
    kind: "square"
    size: number
}

interface p51_Rectangle {
    kind: "rectangle"
    width: number
    height: number
}

interface p51_Circle {
    kind: "circle"
    radius: number
}

type p51_Shape = p51_Square | p51_Rectangle | p51_Circle;

// type predicate 'p51_shape is p51_Square' will reduce the type to 
// p51_Square, instead  of just returning just a boolean value;
function isSquare(p51_shape: p51_Shape): p51_shape is p51_Square {
    return p51_shape.kind === "square"
}

function p51_getArea(p51_shape: p51_Shape): number {
    if (isSquare(p51_shape)) {
        return p51_shape.size ** 2
    } else if (p51_shape.kind === "rectangle") {
        return p51_shape.width * p51_shape.height
    } else {
        return Math.PI * p51_shape.radius ** 2;
    }
}

const p51_square: p51_Shape = { kind: "square", size: 10 }
const p51_rectangle: p51_Shape = { kind: "rectangle", width: 5, height: 8 }
const p51_circle: p51_Shape = { kind: "circle", radius: 4 }

console.log(p51_getArea(p51_square)) // 100
console.log(p51_getArea(p51_rectangle)) // 40
console.log(p51_getArea(p51_circle)) // 50.26548245743669


// Built-in typeguards: Array.isArray etc;
let v51: string | string[];
if (Array.isArray(v51)) { // Array.isArray() is a type guard;
    v51.push('new item'); // Within this block, TS narrows down the type of v51 to string[];
} else {
    console.log(v51.toUpperCase()); // Within this block, TS narrows down the type of v51 to string;
}

// Generics in Type Guards

// null, undefined, false, 0, NaN, '' -> false values;