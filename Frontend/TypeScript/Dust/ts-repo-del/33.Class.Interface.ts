// implements
//  A class can implement one or more interfaces;
//  Implementing class must define all members of the interface with same name and type, it can define extra properties and methods though;

interface IPerson {
    firstName: string;
    lastName: string;
    readonly name: string;
    dob: Date;
    getBirthYear: number;
}