// Interface as Class Type 

/*
Prior to ES6, Constructor functions are used to mimic a class in JavaScript;
Example:
    function Animal( _name ) {
        this.name = _name;
    }
    var dog = new Animal( 'Tommy' );
    console.log( dog.name );    // Tommy

Fortunately, we don't have to work with constructor functions, since TypeScript 
provides class keyword to create a class that is much easier to work with than 
a constructor function, trust me; 

In fact, a class deep down is a constructor function in JavaScript;
Example:
    class Animal2 {
        constructor( _name ) {
            this.name = _name;
        }  
    }
    console.log(typeof Animal); // "function"

Hence, an interface of a constructor function type represents a class;
*/

// Define a Class
class Animal {
    sound: string
    constructor(sound: string) {
        this.sound = sound;
    }
    getSound(): string {
        return `${this.sound}! ${this.sound}!`
    }
}

// Define an Interface to describe the class/anonymous function!
// new keyword indicates that the constructor function can be invoked only using new keyword to generate objects and not using a regular function call!
// We won’t be able to add getSound method signature of the Animal class in IAnimal and the reason is explained in the Classes lesson;
// Unfortunately, We won’t be able to add getSound() signature of the Animal class in IAnimal;
interface IAnimal {
    new (sound: string): Animal;        
}

// create Animal factory!
let createAnimal = (ctor: IAnimal, type: string): Animal => {
    return type === 'dog' ? new ctor('Bow') : new ctor('Meow');
}

// create Animal Instance
let dog: Animal = createAnimal(Animal, 'dog');
console.log('dog.getSound() -> ' + dog.getSound());
