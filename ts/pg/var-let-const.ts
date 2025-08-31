// var
function demoVar() {
  if (true) {
    var x1 = 10;
  }
  console.log(x1); // ✅ Works (not block-scoped)
}

demoVar();

var y1 = 5;
var y1 = 15; // ✅ Redeclaration allowed
console.log('y1: ' + y1);

// ------------------------------------------------------
// let 
function demoLet() {
  if (true) {
    let x2 = 20;
    console.log(x2); // ✅ Works here
  }
  // console.log(x2); // ❌ Error: x is not defined (block scoped)
}
demoLet();

let y2 = 10;
// let y2 = 20; // ❌ Error: cannot redeclare in same scope
y2 = 30; // ✅ allowed


// Eg: let variables are hoisted
// Memory phase (before execution)
var x3 = undefined; // hoisted + initialized
let y3;             // hoisted (but uninitialized → TDZ)

// Execution phase
console.log(x3); // undefined
// console.log(y3); // ❌ ReferenceError (still in TDZ)

x3 = 5;
y3 = 10;

console.log(x3); // 5
console.log(y3); // 10

// ----------------------------------------------------------
// Function declarations are fully hoisted;
sayHello(); // ✅ Works, prints: Hello

function sayHello() {
  console.log("Hello");
}

// function expressions are not hosted;
// sayHi(); // ❌ Error: Cannot access 'sayHi' before initialization

const sayHi = function() {
  console.log("Hi");
};

// --------------------------------------------------------
// const
const x4 = 50;
// x4 = 60; // ❌ Error: cannot reassign

const arr = [1, 2, 3];
arr.push(4); // ✅ Allowed (array contents mutable)

const obj = { name: "Alice" };
obj.name = "Bob"; // ✅ Allowed (properties mutable)

