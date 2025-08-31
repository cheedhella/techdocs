// You can use type, to define the structure of an object;
type TA_User = {
  id: number;
  name: string;
};
const ta_u1: TA_User = { id: 1, name: "Bob" };

// You can define alias to any existing type;
type ta_ID = number;  // alias for number
type ta_Username = string; // alias for string
const ta_userId: ta_ID = 101;
const ta_name: ta_Username = "Alice";

// Union - You can create a new type with multiple possible values;
type ta_Status = "success" | "error" | "loading";
let ta_requestStatus: ta_Status = "success";  // ✅
ta_requestStatus = "error";                // ✅
// ta_requestStatus = "done";              // ❌ Not allowed

// Intersection - You can combile multiple types using intersection(&)
type ta_Person = { name: string };
type ta_Employee = { employeeId: number };
type ta_Staff = ta_Person & ta_Employee;
const staffMember: ta_Staff = {
  name: "Alice",
  employeeId: 123,
};

// You can define the structure of Tuples
type ta_Point = [number, number];
const ta_p: ta_Point = [10, 20];

// You can define the signature of Functions
type ta_Greet = (name: string) => string;
const ta_greet: ta_Greet = (name) => `Hello, ${name}`;
