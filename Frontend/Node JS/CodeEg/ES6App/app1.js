// TODO: 
// https://github.com/lukehoban/es6features
// http://es6-features.org/#Constants
// https://www.w3schools.com/js/js_es6.asp
// ES6 default function parameters
// https://exploringjs.com/es6/index.html#toc_ch_overviews
// https://webapplog.com/es6/

/*
    In this app, we will explore ES6 features that makes working with objects very easier;
*/
// 1. Shorthand syntax - useful when creating objects, under certain conditions;
const name = 'Andrew';
const userAge = 27;
const u1 = {
    name: name,     // We are setting a property whose values comes from a variable of same name; In this case, we can use shorthand syntax;
    age: userAge
};
console.log(u1);

const u2 = {
    name,
    age: userAge
};
console.log(u2);

// 2. Object destructuring - used to extract object properties into individual variables;
const product = {
    name: 'Maggi',
    price: 20,
    stock: 10
};
const {name: productName, price, rating = 5 } = product;
console.log(productName); // name of variable can be different from object property name;
console.log(price);
console.log(rating); // If object doesn't have specified field, you can specify a default value for it;


// Destructuring with function arguments
const printProduct = ({name: productName, price = 11, rating = 6}) => {
    console.log(productName);
    console.log(price);
    console.log(rating); 
};
printProduct(product);