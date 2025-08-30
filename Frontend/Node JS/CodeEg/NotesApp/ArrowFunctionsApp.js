// ES6 Arrow Functions
// regualar function
const square = function (x) {
    return x * x;
}
console.log(square(3));

// arrow function doesn't use function at all! Instead it uses an arrow!
const square2 = (x) => {
    return x * x;
}
console.log(square2(3));

// If your function have a single return statment, you can get rid of return and curly braces as well!
const square3 = (x) => x * x;
console.log(square3(3));


const event1 = {
    name: 'Birthday Party',
    printGuestList: function () {
        console.log('Guest list for', this.name);
    }
}
event1.printGuestList();

// arrow functions as property of an object
const event2 = {
    name: 'Birthday Party',
    printGuestList: () => {
        console.log('Guest list for', this.name);
    }
}
event2.printGuestList(); // prints undefined!
// Arrow functions don't bind
// There is an alternative syntax for situations like this!

const event3 = {
    name: 'Birthday Party',
    printGuestList() {
        console.log('Guest list for', this.name);
    }
}
event3.printGuestList();

const event4 = {
    name: 'Birthday Party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList() {
        console.log('Guest list for', this.name);
        this.guestList.forEach(function (guest) {
            console.log(guest + ' is attending', this.name);
            // stadard functions have their own bidning, so this.name prints undefiend; 
            // what I want is function passed to forEach to have parent function binding;
            // there are many workarounds for this!
        });
    }
}
event4.printGuestList();

// solution -1  -> not ideal!
const event5 = {
    name: 'Birthday Party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList() {
        console.log('Guest list for', this.name);
        const that = this;
        this.guestList.forEach(function (guest) {
            console.log(guest + ' is attending', that.name);
        });
    }
}
event5.printGuestList();

// solution - 2 -> use arrow functions!
const event6 = {
    name: 'Birthday Party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList() {
        console.log('Guest list for', this.name);
        const that = this;
        this.guestList.forEach((guest) => {         // arrow functions don't create their own binding!
            console.log(guest + ' is attending', that.name);
        });
    }
}
event6.printGuestList();

// ---------------------------
//
// Goal: Create method to get incomplete tasks
//
// 1. Define getTasksToDo method
// 2. Use filter to to return just the incompleted tasks (arrow function)
// 3. Test your work by running the script

const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    }, {
        text: 'Clean yard',
        completed: false
    }, {
        text: 'Film course',
        completed: false
    }],
    getTasksToDo1() {
        const tasksToDo = this.tasks.filter((task) => {
            return task.completed === false;
        });
        return tasksToDo;
    },

    getTasksToDo() {
        return this.tasks.filter((task) => task.completed === false)
    }
}

console.log(tasks.getTasksToDo())