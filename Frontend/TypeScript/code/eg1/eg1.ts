let userName = 'max'; // Based on the initial value specified, TS infers the type of userName as string;
// userName = 20; // So, you get this error: Type 'number' is not assignable to type 'string'


let userName2; // It doesn't have any initial value; TS infers its type as any;
userName2 = 'max';  // As type is any, you can assign a string or number or any type;
userName2 = 20;

let userName3: string; // Type is explicitly specified, without initial value;
userName3 = 'max'; 
// userName3 = 20; // Type 'number' is not assignable to type 'string'

let userName4: string = 'abc'; // If you provide initial value, no need to specify type explicitly, TS can infer it; 
    // So, provide type and initial value both, only in some advanced scenarios, where you feel inferred type is not the type you want;
