// In TypeScript, all variables should be declared. 
// In JavaScript, if you don't declare, it will be implicitly declared in the global scope;

// Use var/let/const keyword to declare;
// Let variables should be declared before using; var variables can be declared either before or after using it;
// console.log(myV0); // ERROR: Cannot find name 'myV0'

// ---------------------------------------------------------------------------------------------------------------------------
// let VS var
// Declaration - var Variables can be declared either before OR after using it; Let variables must be declared before using it;
function myVarDeclaration(): void {
    console.log(myVar1);        // undefined; // It is hoisted.
    var myVar1;
}
myVarDeclaration();

function myLetDeclaration(): void {
    // console.log(myLet1);     // ERROR: variable 'myLet1' is used before its declaration;
    let myLet1;
    console.log(myLet1);        // undefined
}
myLetDeclaration();
// ---------------------------------------------
// Re-Declartion 
//      var variable can be redeclared multiple times in the same block;
//      let variable can be redeclared multiple times in the same block, but it can't redeclared in the same scope/level;
function myVarDeclaration2(): void {
    var myVar2: number = 10;
    var myVar2: number = 12;
    if(true) {
        var myVar2: number = 14;
        console.log(myVar2);    // 14
    }
    console.log(myVar2);        // 14
}
myVarDeclaration2();

function myLetDeclaration2(): void {
    let myLet2: number = 10;
    // let myLet1: number = 12; // ERROR: Cannot redeclare block level variable myLet1 in the same scope/level;
    if(true) {
        let myLet2: number = 14;
        console.log(myLet2);    // 14
    }
    console.log(myLet2);        // 10
}
myLetDeclaration2();

// ---------------------------------------------
// Scope
// Scope of var variables is function scope(wherever there are defined inside the function);
// Scope of let variables is limited to the block(function/if-else/loop);
function myVarDeclaration3(): void {
    if(true) {
        var myVar3: number = 14;    // If if it is declared inside if loop, var is visible to the entire function;
    }
    console.log(myVar3);            // 14
}
myVarDeclaration3();

function myLetDeclaration3(): void {
    if(true) {
        let myLet3: number = 14;
        console.log(myLet3);        // 14
    }
    // console.log(myLet3);         // ERROR: Cannot find name 'myLet3'
}
myLetDeclaration3();
