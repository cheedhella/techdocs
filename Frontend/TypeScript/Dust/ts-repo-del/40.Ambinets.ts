// So far, we are calling TypeScript code TypeScript;
// There is lot of JS code in third-party libraries such as JQuery, Require etc;
// We need not to rewrite those libiraries to use them in TypeScript in a type-safe manner;

// Ambient declarations are a way of telling the TypeScript compiler that the actual source code exists elsewhere. 
// When you are consuming a bunch of third party js libraries like jquery/angularjs/nodejs you can't rewrite it in TypeScript.

// It also provides Intellisense for third-party libraries. You just press dot(.), it will list all methods;

// All ambinent declarations will be written in a declaration file with an extension(.d.ts), where d denotes declaration;

// We can tell TypeScript that the code we are trying to reuse is there in some other place using declare keyword;
// It's not mandatory to put declarations in .d.ts file, it can put in either .ts or .d.ts files;
// But, it is recommeded to put declaration in a separate file.

// Because of ambinent file OR declarations, we can compile ts code which uses js code;