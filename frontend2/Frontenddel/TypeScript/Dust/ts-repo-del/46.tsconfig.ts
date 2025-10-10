# tsconfig.json - Inputs to tsc, when generating .js from .ts;
{
	"compilerOptions": {
		"module": "amd", 			# 
		"noImplicitAny": true, 	# If type is not specified, don't fallback to 'any';
		"noEmitOnError": true,  	# Don't generate 
		"removeComments": false, 	# Remove comments
		"sourceMap": true, 			# 
		"target": "es5"				# Generates ECMA 5 JS
	},
	"exclude": [ 					# Ignore these folders
		"node_modules",
		"wwwroot"
	]
}
// https://ultimatecourses.com/blog/typescript-types-the-any-type
// https://github.com/TypeStrong/learn-typescript/tree/master/04-project/01-tsconfig