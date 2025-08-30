/*

What is namespace?
	In JavaScript, all declarations go into the global namespace; So, if your project contains 
	multiple JS files, then there is a possibility of one declaration overwriting another unknowingly;
	TypeScript avoids this problem by introducing the concept of namespaces and modules;
	
	In short, Namespace avoids the collisions that can occur in global scope, by logically grouping 
	objects(such as interfaces, classes, functions and variables);

How to Create a namespace?
	- A namespace can be created using 'namespace' keyword followed by namespace name.
	- All objects(such as interfaces, classes, functions, and variables) can be defined in curly braces.
	- Example: 
		namespace <name>
		{

		}
	- One TS file can hold multiple namespaces and one namespace can span multiple TS files(unlike modules).
	
Exporting namespace components
	- By default, namespace components cannot be used in other namespaces or modules.
	- You need to export each component to make it accessible outside, using the export keyword.
	- Example:
		namespace <name>
		{
			export function one():void {}
			export function two():void {}
		}

Access components in another namespace
	If both namespaces are in the same file, then use this syntax: namespaceName.className;
	If both namesapces are in different files, then use triple slash reference syntax:
		/// <reference path = "SomeFileName.ts" />


The following command option is used to compile multiple namespaces into a single .js file.
	tsc --outFile app.js File1.ts File2.ts File3.ts.. FileN.ts 	// TS Compile will automatically order the files;
	tsc -out _compiled/main.js Main.ts

Alternatively, you can use tsconfig.js as below:
	{
		"compilerOptions": {
			"outFile": "./app.js",
			"module": "amd",
			...
		}
	}

*/

// ---------------------------------------------------------------------------------------------------------------------------
/*
Namspace Patterns
	https://addyosmani.com/blog/essential-js-namespacing/#beginners
	IIFE pattern - https://www.tutorialsteacher.com/typescript/typescript-namespace
*/
// TODO: Nested Namespaces