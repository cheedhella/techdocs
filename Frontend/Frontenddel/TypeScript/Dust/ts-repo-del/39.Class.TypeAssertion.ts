
// ---------------------------------------------------------------------------------------------------------------------------



// ---------------------------------------------------------------------------------------------------------------------------

--------------------------------------------------------------------

//  Static Properties
// Abstract Classes



// Type Assertion

// JavaScript or TypeScript doesn't allow expanding the properties in any object dynamically;
var user = {};
// user.name = 'asdf'; // ERROR: Property 'name' does not exist on type '{}'

// we can fix above problem by using type assertion as iUser;
interface iUser {
    name: string;
}

var user2 = {} as iUser;
user2.name = 'asdf';
