// Intersection type example
type Person = {
    name: string;
    age: number;
  };
  
  type Employee = {
    company: string;
    position: string;
  };
  
  type EmployeePerson = Person & Employee;
  
  const employee1: EmployeePerson = {
    name: "John Doe",
    age: 30,
    company: "ABC…
  