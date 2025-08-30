/*
readonly
    A readonly property of an interface/class/type can be accessed outside the class, but it can't be changed;
    So, it needs to be initialized either at the declaration OR inside the class constructor;
*/

// ---------------------------------------------------------------------------------------------------------------------------
// readonly members in an interface
interface IEmp29_1 {
    readonly id: number;
    name: string;
}
let emp29_1: IEmp29_1 = {
    id: 108,
    name: "e108"
};
// emp29_1.id = 109;               // ERROR: Cannot assign to 'id' because it is a read-only property
emp29_1.name = 'e108new';
console.log('Id: ' + emp29_1.id + ', name: ' + emp29_1.name);     // Id: 108, name: e108new
// ---------------------------------------------------------------------------------------------------------------------------
// readonly members in a Class
class Emp29_2 {
    readonly id: number;
    name: string;
    
    constructor(id: number, name: string)     {
        this.id = id;
        this.name = name;
    }
}

let emp29_2 = new Emp29_2(107, "e107");
// emp29_2.id = 108;                   // ERROR: Cannot assign to 'id' because it is a read-only property;
emp29_2.name = 'e107new';
console.log('Id: ' + emp29_2.id + ', name: ' + emp29_2.name);     // Id: 107, name: e107new
// ---------------------------------------------------------------------------------------------------------------------------
// If you want all members of a type to be readonly, you can do this:
type User29_1 = {
    readonly id: number,
    readonly name: string
};
const user29_1_1 = { id: 101, name: 'e101'};
user29_1_1.id = 102;
user29_1_1.name = 'e102';


// ReadOnly<T> Type
//      If you want all members of a type to be readonly, typing readonly in front of each one can be tedious sometimes;
//      TypeScript’s Readonly mapped type is another way of creating a readonly type;
//		All members of a Readonly type object are implicitly readonly and can't be changed once it is initialized;
type User29_2 = Readonly<{
    id: number,
    name: string
}>;
const user29_2_1 = { id: 101, name: 'e101'};
user29_2_1.id = 102;            // ERROR: Cannot change readonly 'id'
user29_2_1.name = 'e102';       // ERROR: Cannot change readonly 'name'
console.log('Id: ' + user29_2_1.id + ', name: ' + user29_2_1.name); // Id: 101, name: e101

// ---------------------------------------------------------------------------------------------------------------------------
// readonly works only on Top level properties;
interface IEmp29_3 {
    id: number;
    name: string;
    scores: number[]
}
let emp29_3_2: Readonly<IEmp29_3> = {
    id: 110,
    name: "e110",
    scores: [10, 20]
};
// emp29_3_2.id = 1109;                // ERROR: Cannot assign to 'id' because it is a read-only property;      
// emp29_3_2.name = 'e109new';         // ERROR: Cannot assign to 'name' because it is a read-only property;
// emp29_3_2.scores = [30, 40];        // ERROR: Cannot assign to 'scores' because it is a read-only property;
emp29_3_2.scores[0] = 15;
emp29_3_2.scores.push(30);
emp29_3_2.scores.pop();
console.log(emp29_3_2);
// ------------------------
// You can put an additional readonly keyword before the array itself to make it immutable;
// TypeScript's type checker will produce an error if we try to write to the array or call mutating array methods such as push(), pop(), or splice():
interface IEmp29_4 {
    id: number;
    name: string;
    scores: readonly number[]
}
let emp29_4_1: Readonly<IEmp29_4> = {
    id: 110,
    name: "e110",
    scores: [10, 20]
};
// emp29_4_1.scores[0] = 15;       // ERROR: Index signature in type 'readonly number[]' only permits reading;
// emp29_4_1.scores.push(30);      // ERROR: Property 'push' does not exist on type 'readonly number[]';
// emp29_4_1.scores.pop();         // ERROR: Property 'pop' does not exist on type 'readonly number[]';
console.log(emp29_4_1);
// ------------------------
// ReadonlyArray<T>
//      You can also use ReadonlyArray to do same thing;
//      ReadonlyArray<T> and readonly T[] represent the same type;

interface IEmp29_5 {
    id: number;
    name: string;
    scores: ReadonlyArray<number>
}
let emp29_5_1: Readonly<IEmp29_5> = {
    id: 110,
    name: "e110",
    scores: [10, 20]
};
// emp29_5_1.scores[0] = 15;       // ERROR: Index signature in type 'readonly number[]' only permits reading;
// emp29_5_1.scores.push(30);      // ERROR: Property 'push' does not exist on type 'readonly number[]';
// emp29_5_1.scores.pop();         // ERROR: Property 'pop' does not exist on type 'readonly number[]';
console.log(emp29_5_1);
// ---------------------------------------------------------------------------------------------------------------------------
// const vs readonly vs immutability
/*
const
    - Used for variables;
    - Can't be reassigned;
    - If it is an array, you can change it;
    - This is a check at runtime as well;

readonly
    - Used for properties OR class members;
    - Can be reassigned, but only inside the constructor;
    - If it is an array, you can change it;
    - This is only a compile-time check; Once the TypeScript code is compiled to JavaScript, all notions of readonly are gone;
    - TODO: Use Object.freeze(), if you want a type to be readonly during runtime as well;

Immutability
    - An array is const or readonly, doesn't mean it is immutable;
    - Example:
        const arr1 = [1, 2, 3];
        # arr1 = [3, 4, 5]; // Not Allowed!
        arr1.push(6);       // Allowed!
        arr1.pop();         // Allowed!
        arr1[0] = 4;        // Allowed!

*/
// ---------------------------------------------------------------------------------------------------------------------------

function getList29_1(): readonly number[] {
    return [1, 2, 3];
}
const myList29_1 =  getList29_1();
// myList29_1[2] = 4; // ERROR: Index signature in type 'readonly number[]' only permits reading

function getList29_2(): Readonly<number[]> {
    return [1, 2, 3];
}
const myList29_2 =  getList29_2();
// myList29_2[2] = 4;  // ERROR: Index signature in type 'readonly number[]' only permits reading

function getList29_3(): ReadonlyArray<number> {
    return [1, 2, 3];
}
const myList29_3 =  getList29_3();
// myList29_3[2] = 4;  // ERROR: Index signature in type 'readonly number[]' only permits reading
for (const n of myList29_3) {
    console.log(n);
}


const arr29_1: readonly string[] = ["a", "b", "c"];
// const arr29_1_1: string[] = arr29_1;    // ERROR: The type 'readonly string[]' is 'readonly' and cannot be assigned to the mutable type 'string[]';;
const arr29_2: ReadonlyArray<number> = [1, 2, 3];
// const arr29_2_1: number[] = arr29_2;    // ERROR: The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'
