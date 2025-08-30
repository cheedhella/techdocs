import faker from 'faker'; // ERROR: Couldn't find the declaration file 'faker';
                           // Only some of the JS libraries comes with a TypeScript definition file, by default;
                           // @types/faker -> contains TypeScript definitions for faker JS library; 
                           // TSC makes use of this package for type checking any code in the JS library;
                           // Definitely Typed Scheme contains TypeScript definitions for lot of JS libraries, most of them hosted in npmjs.org;
                           // Solution: npm install @types/faker
                           // Once installed, above error is gone!

                           // Purpose of TypeDefintion file?
                           //   Hold Cmd/Ctrl, hover on faker above, it turns into a link, click on it, which takes you to the type definition file(.d.ts file);
                           //   It contains nothing but only TypeScript syntax; Only goal of that file is to describe different functions, classes, objects, values that exists in faker library;
                           //   It contains only type defintion, no implementaion;
import { Mappable } from './Map';

export class User implements Mappable {         // Use export keyword, to make this class available in other files;
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
    color: string = 'red';

    // Let's use faker package to randomly generate a User, Location and initialize user object with it;
    constructor() {
        this.name = faker.name.firstName();
        this.location = {
            latitude: parseFloat(faker.address.latitude()),
            longitude: parseFloat(faker.address.longitude())
        };
    }

    markerContent(): string {
        return `Username: ${this.name}`;
    }
}