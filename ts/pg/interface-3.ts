// ============================================
// 1. Basic Similarity
// ============================================

// interface
interface IF3_User {
  id: number;
  name: string;
}

// type
type IF3_UserType = {
  id: number;
  name: string;
};

const if3_u1: IF3_User = { id: 1, name: "Alice" };
const if3_u2: IF3_UserType = { id: 2, name: "Bob" };


// ============================================
// 2. Extension / Inheritance
// ============================================

interface IF3_Person {
  name: string;
}
interface IF3_Employee extends IF3_Person {
  salary: number;
}

const if3_worker: IF3_Employee = { name: "Charlie", salary: 50000 };

type IF3_Animal = { species: string };
type IF3_Dog = IF3_Animal & { breed: string };

const if3_dog: IF3_Dog = { species: "Canine", breed: "Labrador" };


// ============================================
// 3. Declaration Merging
// ============================================

interface IF3_Box {
  height: number;
}
interface IF3_Box {
  width: number;
}
// merged interface
const if3_myBox: IF3_Box = { height: 10, width: 20 };

// ❌ Types don’t merge
// type IF3_Shape = { radius: number };
// type IF3_Shape = { diameter: number }; // Error


// ============================================
// 4. Usage Flexibility
// ============================================

type IF3_ID = string | number;  // union
type IF3_Point = [number, number]; // tuple

const if3_id1: IF3_ID = 123;
const if3_id2: IF3_ID = "ABC";

const point: IF3_Point = [10, 20];


// ============================================
// 5. Classes with Interfaces and Types
// ============================================

interface IF3_Flyable {
  fly(): void;
}

type IF3_Swimmable = {
  swim(): void;
}

class IF3_Duck implements IF3_Flyable, IF3_Swimmable {
  fly() {
    console.log("Duck flies");
  }
  swim() {
    console.log("Duck swims");
  }
}

const if3_d = new IF3_Duck();
if3_d.fly();
if3_d.swim();


// ============================================
// ✅ Summary
// ============================================
// - interface: best for objects, classes, APIs, can merge
// - type: more flexible (unions, tuples, primitives), cannot merge
