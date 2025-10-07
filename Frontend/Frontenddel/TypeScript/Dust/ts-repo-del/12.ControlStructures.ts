for..of vs. for..in statements:
 Both for..of and for..in statements iterate over lists; the values iterated on are different though, for..in
returns a list of keys on the object being iterated, whereas for..of returns a list of values of the numeric
properties of the object being iterated.
 In TypeScript/JavaScript objects have internal properties with themselves. One of the property is
[[Enumerable]]. If [[Enumerable]] is set to true it will iterate through object properties only rather through the items or elements.
 For..of is a new way for iterating collections. It’s introduced in ES6. Earlier you had to
Here is an example that demonstrates this distinction:
const numLivesForCat = 9; 
const kitty = {
    name: "Aurora",
    numLives: numLivesForCat, 
}

let list = ["A", "B", "C"]; 
for (let i in list) {
    console.log(i + " "); // 0 1 2 
}
for (let i of list) { 
    console.log(i + " "); // A B C
}


use for
or while
loop to iterate through elements of a collection. 
