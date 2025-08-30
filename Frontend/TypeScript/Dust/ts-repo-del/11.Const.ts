// Const
// const is same as let; Only difference is it must initialized while declaring and once initialized, it can't be changed;

function myConstDeclaration(): void {
    // const myC1: number;             // ERROR: const declaration must be initialized
    const myC2: number = 10;
    // myC2 = 12;                      // ERROR: Cannot assign to 'myC2' because it is a constant
    if(true) {
        const myC2: number = 12;
        console.log(myC2);             // 12
    }
    console.log(myC2);                 // 10
}
myConstDeclaration();

// ---------------------------------------------------------------------------------------------------------------------------

/*
// TODO: const arrays
const myStringArray: string[] = ['fee', 'fi', 'fo', 'fum'];
const myStringArray: Array<string> = ['fee', 'fi', 'fo', 'fum'];

// TODO: const object
const kitty = {
    name: "Aurora",
    numLives: numLivesForCat, }

*/
