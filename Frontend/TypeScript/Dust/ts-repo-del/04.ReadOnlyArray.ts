TypeScript comes with a ReadonlyArray<T> type that is the same as Array<T> with all mutating methods removed, so 
you can make sure you don’t change your arrays after creation:

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
On the last line of the snippet you can see that even assigning the entire ReadonlyArray back to a normal array is illegal. 
You can still override it with a type assertion, though:

a = ro as number[];