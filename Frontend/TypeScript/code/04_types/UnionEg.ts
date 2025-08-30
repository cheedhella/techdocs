// In Typescript, union and intersection are used to create new types from existing types;
// Union type -> It creates a new type that can hold values of multiple types;

// Type u01_status is a union of 3 string liters - active, inactive, pending;
type u01_status = "active" | "inactive" | "pending";
let u01_s01: u01_status = "active"; // fine!
// let u01_s02: u01_status = "active2"; // Error: Type '"active2"' is not assignable to type 'u01_status'

// u02_result can be a number or string;
type u02_result = number | string;
function u02_processResult(u02_result_01: u02_result) {
    if (typeof u02_result_01 === "number") {
        // Handle number type
    } else if (typeof u02_result_01 === "string") {
        // Handle string type
    }
}


// It combines several types into one;

// an intersection type is a type that combines several types into one; a value that can be any one of several types is a union type.
// The & symbol is used to create an intersection, whereas the | symbol is used to represent a union. 
// TypeScript lets you create a union type that is a composite of selected types separated by a vertical bar, |.

// Union types in TypeScript allow us to define a variable or parameter that can hold values of multiple types. 
//To create a union type, use the | operator between the types within parentheses.

// This allows you to combine many types to create a single type with all of the properties that you require. An object of this type will have members from all of the types given. The ‘&’ operator is used to create the intersection type.


interface U01_Student {
    sid: number;
    name: string;
}

interface U01_Teacher {
    tid: number;
    name: string;
}

type U01_U = U01_Student | U01_Teacher; // Union type can only have props that are common to both;
type U01_I = U01_Student & U01_Teacher; // Intersection type can have any props that are available in both;

let U01_u01: U01_U = {
    sid: 3232,
    name: "rita",
    tid: 7873,
};

let U01_i01: U01_I = {
    sid: 3232,
    name: "rita",
    tid: 7873,
};

// console.log(U01_u01.sid + ", " + U01_u01.tid + ", " + U01_u01.name); // Property 'tid' does not exist on type 'U01_U'
console.log(U01_i01.sid + ", " + U01_i01.tid + ", " + U01_i01.name);
