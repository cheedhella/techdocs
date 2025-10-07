/*
What is Module?
	In JavaScript, all declarations go into the global scope; So, if your project contains 
	multiple JS files, then there is a possibility of one declaration overwriting another unknowingly;
	TypeScript avoids this problem by introducing the concept of namespaces and modules;
	
	In short, a Module restricts the scope of all components(such as interfaces, classes, functions and variables) 
	to that file. If you want a component to be accessible to other module, you can export it and other modules can 
	import it before using.

	In other words, all modules share the code using export and import statements;
	At run-time, module loader such as RequireJS is responsbile for locating and loading all dependencies 
	of a module before executing it;

How to Create a module?
	- In Typescript, any file that imports or exports something is considered as a Module;
	- Name of the module is name of the file itself;

A module exports only what it wants other code to be able to use;
Modules can make use of other modules by importing them;

export
	- Preceede the declaration with export;
	- Use export { TypeName } at the end of the file;
	- Use export { TypeName as TypeNameDummy } at the end of the file; // Renaming an Export

import
	- import { Employee } from "./Employee"; 				// import single type 
	- import { Employee as Associate } from "./Employee" 	// Renaming an Export
	- import * as Emp from "./Employee" 					// Importing the Entire Module into a Variable

TypeScript provides modules and namespaces in order to prevent littering in the default global scope(part of window object);

*/