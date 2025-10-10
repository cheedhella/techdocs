/*
Steps to Compile:
	cd /Users/mcheedhe/dev/git-repo/mytypescript/namespace-eg/eg3
	tsc -out _compiled/app.js App.ts StringUtils.ts
*/

/// <reference path = "StringUtils.ts" />

console.log("StringUtils.toUpper('abc'): " + StringUtils.toUpper('abc'));
