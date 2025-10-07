declare module MProfile {
    export interface IEmployee {
        EmpName: string;
        EmpSalary: number;
        new(name: string, sal: number): IEmployee;
    }
    export interface Main {
        emp: IEmployee;
        sayHello(msg: string): string;
    }
}
//after declaring module root level interface is declared as Profile. Where this declaration variable must be same as the root variable in your library.
// in this example "Profile" is the root variable in library.js, so we are declaring that root variable in this declaration file with the same name given.
declare var Profile: MProfile.Main;