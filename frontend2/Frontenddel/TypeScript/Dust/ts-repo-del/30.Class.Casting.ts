// Type Casting - use <> or as for type casting; 
// You can use instanceof to find the type of an object; similar to typeof is used to find the type of a variable; 

let myVar11: string;
let myVar12: any;
myVar11 = <string> myVar12;     // using <> keyword
myVar11 = myVar12 as string;    // using as keyword

alert(childClass instanceof parentClass); // alerts true;