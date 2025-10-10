// Base interface
interface IF2_Item {
  name: string;
}

// Interface Extending another interface
interface IF2_Person extends IF2_Item {
  age: number;
}

const if2_p1: IF2_Person = {
  name: "Alice",
  age: 28,
};

console.log(if2_p1.name);       // "Alice"
console.log(if2_p1.age); // "Engineering"

interface IF2_Drivable {
  start(): void;
  stop(): void;
}

// Interface Extending multiple interfaces
interface IF2_Vehicle extends IF2_Item, IF2_Drivable {
  
}

const if2_v1: IF2_Vehicle = {
  name: "Tiago",
  start() {
    console.log("Started the vehicle: " + this.name);
  },
  stop() {
    console.log("Stopped the vehicle: " + this.name);
  },
};

if2_v1.start();  // "Started the vehicle: Tiago"
if2_v1.stop();   // "Stopped the vehicle: Tiago"
