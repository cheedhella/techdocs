var Profile = {
    emp: (function () {
        function emp(name, sal) {
        this.EmpName = name; this.EmpSalary = sal;
        }
        return emp;
    })(),
    sayHello: function (message) {
        return "Hello " + message;
    }
};