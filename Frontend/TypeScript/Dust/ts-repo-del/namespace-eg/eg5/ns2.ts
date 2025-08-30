namespace myns {
	// export const foo = 456; // ERROR: Cannot redeclare block-scoped variable 'foo'
	export const bar = myns.foo + 1;
}