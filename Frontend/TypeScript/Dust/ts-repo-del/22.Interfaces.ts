// Interface as Function Type - Interface is also used to define the signature of a function;
/*
Syntax:
	interface InterfaceName {
  		(paramName: paramType): returnType;		// Parameter names doesn't matter!
	}
*/
interface KeyValuePair {
	(n1: number, n2: number): number;
};

function add(k1: number, k2: number): number {
	console.log('add: k1 = ' + k1 + ', k2 = ' + k2); 		// add: k1 = 2, k2 = 1
	return k1 + k2;
}

function subtract(k1: number, k2: number): number {
	console.log('subtract: k1 = ' + k1 + ', k2 = ' + k2); 	// subtract: k1 = 2, k2 = 1
	return k1 - k2;
}

let kvp: KeyValuePair = add;
console.log('2 + 1 = ' + kvp(2, 1)); 		// 2 + 1 = 3

kvp = subtract;
console.log('2 - 1 = ' + kvp(2, 1)); 		// 2 - 1 = 1

/*
// Trying to assign a function with a different signature will cause an error;
function mydelete(key: string): string {
	console.log('Key deleted.');
	return key;
}
kvp = mydelete; // ERROR: Type '(key: string) => string' is not assignable to type 'KeyValuePair'
*/

// ---------------------------------------------------------------------------------------------------------------------------
interface ISum {
    (a: number, b: number): boolean;
}
let isSumOdd: ISum = (x: number, y: number): boolean => {
    if((x + y) % 2 == 0) {
        return false;
    }
    return true;
}
console.log('isSumOdd(1, 2): ' + isSumOdd(1, 2));
console.log('isSumOdd(2, 2): ' + isSumOdd(2, 2));
// ---------------------------------------------------------------------------------------------------------------------------
