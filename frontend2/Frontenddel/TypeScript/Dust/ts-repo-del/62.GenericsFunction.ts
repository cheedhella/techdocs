// -----------------------------------------------------------------------------------------------
// Eg #1: Restrict generic type to a specific set of types;
// This class takes an array of strings OR numbers, concatenates them into a single string;
class Concatenator<T extends Array<string> | Array<number>> {
    public concatenate(items: T): string {
        let returnString = "";
        for (let i = 0; i < items.length; i++) {
            returnString += i > 0 ? "," : "";
            returnString += items[i].toString();
        }
        return returnString;
    }
}

let concator = new Concatenator();
// Concatenate an array of strings
let concatResult = concator.concatenate(["first", "second", "third"]);
console.log(`concatResult = ${concatResult}`);

// Concatenate an array of numbers
concatResult = concator.concatenate([1000, 2000, 3000]);
console.log(`concatResult = ${concatResult}`);

// concatResult = concator.concatenate([true, false, true ]); // ERROR: Type 'boolean' is not assignable to type 'string | number'

// -----------------------------------------------------------------------------------------------


// Another limit of generic code is that it can only reference functions or properties of objects that are common to any type of T.
// Define an interface IPrintId with id property of type
// number and print method with no return value.

interface IPrintId {
    id: number;
    print(): void;
}

// Define an interface IPrintName with name property of type
// string and print method with no return value.

interface IPrintName {
    name: string;
    print(): void;
}

function useT<T extends IPrintId | IPrintName>(item: T): void {
    item.print();
    // item.id = 1; //error : id is not common
    // item.name = "test"; //error : name is not common
}

// Construct a generic type from another
// This technique essentially uses one type to apply a constraint on another type.
// Define a function named printProperty that takes two generic type parameters
// https://www.educative.io/courses/mastering-typescript/using-generics-to-constrain-types
function printProperty<T, K extends keyof T>
    (object: T, key: K) {
    let propertyValue = object[key];
    console.log(`object[${key}] = ${propertyValue}`);
}

let obj1 = {
    id: 1,
    name: "myName",
    print() { console.log(`${this.id}`) }
}

printProperty(obj1, "id");
printProperty(obj1, "name");
printProperty(obj1, "surname");
