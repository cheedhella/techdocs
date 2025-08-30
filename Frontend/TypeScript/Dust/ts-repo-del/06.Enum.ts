/*
What is enum?
    Enum is a set of constants; Once defined, you can use it as a type;
    It comes in 3 flavours: Numeric, String, Mixed;

    Enums in TypeScript isn’t only a compile-time feature; The enum type does actually gets compiled into a JavaScript object;
    Eg:
        enum Speed {
            SLOW,
            MEDIUM,
            FAST
        }

        var Speed;
        (function (Speed) {
            Speed[Speed["SLOW"] = 0] = "SLOW";
            Speed[Speed["MEDIUM"] = 1] = "MEDIUM";
            Speed[Speed["FAST"] = 2] = "FAST";
        })(Speed || (Speed = {}));

*/

// ---------------------------------------------------------------------------------------------------------------------
// Numeric enum
// It is optional to assign value to members; Behind the scenes, typeScript assigns each member a value starting from 0;
enum Color { 
    Red,
    Green,
    Blue
}
console.log("Color.Red: " + Color.Red);             // 0
console.log("Color.Green: " + Color.Green);         // 1
console.log("Color.Blue: " + Color.Blue);           // 2

// You can also assign a custom value to any member; Typescript auto increments the value of further members;
enum Color2 { 
    Red, 
    Green = 5, 
    Blue 
}
console.log("Color2.Red: " + Color2.Red);             // 0
console.log("Color2.Green: " + Color2.Green);         // 5
console.log("Color2.Blue: " + Color2.Blue);           // 6

enum StatusCode {
    NotFound = 404,
    Success = 200,
    Accepted = 202,
    BadRequest = 400
}
console.log("StatusCode.NotFound: " + StatusCode.NotFound);       // 404
console.log("StatusCode.Success: " + StatusCode.Success);         // 200

// Lookup
console.log("Color.Red: " + Color.Red);             // 0
console.log("Color[0]: " + Color[0]);               // "Red" 


// ---------------------------------------------------------------------------------------------------------------------
// String enum
// You need to assign a value to each member, without exception;
enum Direction {
    UP = "Up",
    DOWN = "Down",
    LEFT = "Left",
    RIGHT = "Right"
}
console.log("Direction.UP: " + Direction.UP);           // Up
console.log("Direction.DOWN: " + Direction.DOWN);       // Down
console.log("Direction.LEFT: " + Direction.LEFT);       // Left
console.log("Direction.RIGHT: " + Direction.RIGHT);     // Right
// console.log("Direction.UNKNOWN: " + Direction.UNKNOWN);     // Compiler Error: Property 'UNKNOWN' does not exist on type

// lookup
console.log("Direction.UP: " + Direction.UP);           // Up
// console.log("Direction[0]: " + Direction[0]);           // It will not with string enums; 
// console.log("Direction['UP']: " + Direction['UP']);     // It will not with string enums;

// ---------------------------------------------------------------------------------------------------------------------
// Computed enum

// Eg1: 
enum Size {
    Small = 1,
    Medium = 2,
    Large = 3,
    XLarge = Large * 2,
}

// Eg2
enum Colours {
    RED = 1,
    YELLOW,
    GREEN,
    BLUE = getColourIndex('BLUE')
}
function getColourIndex(colour: string): number {
    if (colour === 'BLUE') {
        return 4;
    }
    return -1;
}
console.log(Colours.RED);    // 1
console.log(Colours.BLUE);   // 4

// ---------------------------------------------------------------------------------------------------------------------
// Const enum
//      enum can be set as a constant to speed up the performance;
//      Const enums don't exist in the generated JS; They get replaced with underlying values at compile time;




// ---------------------------------------------------------------------------------------------------------------------
// Adding function to enum
enum Color4 {
    RED,
    GREEN,
    BLUE
}
// Defining a function inside an enum requires the use of a namespace with an exported function.
namespace Color4 {
    export function yourFunction() {
        console.log("I am in a Enum");
    }
}
Color4.yourFunction();
// ---------------------------------------------------------------------------------------------------------------------
// Iterating over enums
for (const color in Color) {
    console.log(color);
};


// Enum to Array
// We can use IsNaN operator to filter names and values. 
// Values that don’t convert to Number are deemed enum member names;
console.log(Object.values(Color).filter(x => !isNaN(Number(x))));    //[0, 1, 2]
console.log(Object.values(Color).filter(x => isNaN(Number(x))));     // ['RED','YELLOW','GREEN']





// ---------------------------------------------------------------------------------------------------------------------




//      preserveConstEnums -> 



enum Shape {
    Circle,
    Rectangle,
    Triangle,
  }
  
  type Circle = {
    kind: Shape.Circle;
    radius: number;
  };
  
  type Rectangle = {
    kind: Shape.Rectangle;
    width: number;
    height: number;
  };
  
  type Triangle = {
    kind: Shape.Triangle;
    base: number;
    height: number;
  };
  
  type ShapeType = Circle | Rectangle | Triangle;
  
  function calculateArea(shape: ShapeType): number {
    switch (shape.kind) {
      case Shape.Circle:
        return Math.PI * shape.radius ** 2;
      case Shape.Rectangle:
        return shape.width * shape.height;
      case Shape.Triangle:
        return (shape.base * shape.height) / 2;
    }
  }
  
  const circle: Circle = { kind: Shape.Circle, radius: 5 };
  const rectangle: Rectangle = { kind: Shape.Rectangle, width: 3, height: 4 };
  const triangle: Triangle = { kind: Shape.Triangle, base: 6, height: 8 };
  
  console.log(calculateArea(circle)); // Output: 78.53981633974483
  console.log(calculateArea(rectangle)); // Output: 12
  console.log(calculateArea(triangle)); // Output: 24

  
  const size: Size = Size.XLarge;



Constant enum






// numeric enums members also get a reverse mapping from enum values to enum names. For example, in this example:

enum Enum {
  A,
}
 
let a = Enum.A;
let nameOfA = Enum[a]; // "A"














for (var prop in Day) {
    if (Day.hasOwnProperty(prop) &&
      (isNaN(parseInt(prop)))) {
      console.log("dia: " + prop);
    }
  }


  enum Response {
    No = 0,
    Yes = 1,
}
function respond(recipient: string, message: Response): void {
    // ...
}
respond("Princess Caroline", Response.Yes)



// - Each member is initialized with a string literal OR another enum member;
// enum can be of string type. In that case, every member requires a value without exception.




// Advantages: 
// Logging - If you log string enum, you will see string;
// Strict type checking - You can't pass any string to a function accepting string enum;
function displayStringEnum(myDir: Direction) : void {
    console.log('Received StringEnum: ' + myDir);
}
displayStringEnum(Direction.UP); // Received StringEnum: Up
// displayStringEnum('Up'); // Error: Argument of type '"Up"' is not assignable to parameter of type 'Direction'

// Disadvantages:
// Reverse Mapping - String enums don't support it!

// ---------------------------------------------------------------------------------------------------------------------
// Mixed enum - Each member can be a number or string;
// Members without initializer has to come first OR they should be preeced by a member which is numeric;
// A mixed enum value type is acceptable if every member is defined. For example, you can have one item be an integer and another be a string type. It is recommended not to mix types since it might be more confusing than pragmatic.
enum myMixEnum {
    A,
    B,
    C = 'C',
    D = 'D',
    E = 8,
    F
}
console.log('A: '  + myMixEnum.A + ', B: '  + myMixEnum.B + ', C: '  + myMixEnum.C); // A: 0, B: 1, C: C
console.log('D: '  + myMixEnum.D + ', E: '  + myMixEnum.E + ', F: '  + myMixEnum.F); // D: D, E: 8, F: 9

// ---------------------------------------------------------------------------------------------------------------------
// TODO: Strange output!! FOR loop is giving strange output, when used with numeric OR mixed enums;
enum Align {
    LEFT = 'left',
    CENTER = 0,
    RIGHT = 'right'
}

for (let key in Align) {
    console.log(`key=${key}, value=${Align[key]}`);
}
/*
Output:
key=0, value=CENTER
key=LEFT, value=left
key=CENTER, value=0
key=RIGHT, value=right
*/
// ---------------------------------------------------------------------------------------------------------------------

/*
References:
https://2ality.com/2020/01/typescript-enums.html





    Enums allow us to define a set of named constants. 
    TypeScript allows both numeric and string-based enums.
    These can be of type number, string, or even both!
    By using Enums, you can enjoy a better developer experience as you’d get autocompletion and avoid typos, leading to less debugging time.

enum must have a name and accepted values. Afterward, you can use the enum as a type.







//   numeric values starting from 0. 
// For instance, Color.Red corresponds to 0, Color.Green to 1, and so on.
// Numeric enum members have a name and a value. The first member is assigned a value of zero, the next a value of one, etc.







let myColor1: Color = Color.Green;
console.log("myColor1: " + myColor1); // 1


// Advantages: 
// Reverse Mapping - You can map member value to member name; 
let blueColor: String = Color[2];
console.log('blueColor: ' + blueColor); // 'Blue'

// Disadvantages:
// Logging - If you log numeric enum, you will see number;
// Loose type checking - You can pass any number to a function accepting numeric enum;
function show(myColor3: Color) : void {
    console.log('Received: ' + myColor3);
}
show(Color.Blue); // Received: 2
show(20); // Received: 20

enum MyEnum {
    ChoiceA,
    ChoiceB,
    ChoiceC,
}
enum MyEnum2 {
    ChoiceA, // 0
    ChoiceB = 100, // 100
    ChoiceC, // 101
    ChoiceD = MyEnum.ChoiceC, // 2
}

*/