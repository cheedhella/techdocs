/// <reference path="mylibrary.d.ts" />
var msg = Profile.sayHello("Deccansoft");
console.log(msg);
console.log("List of Employees");
var emp1 = new Profile.emp("Phani", 15000);
console.log("Name= " + emp1.EmpName + ",Salary= " + emp1.EmpSalary); var emp2 = new Profile.emp("Charan", 20000);
console.log("Name= " + emp2.EmpName + ",Salary= " + emp2.EmpSalary);