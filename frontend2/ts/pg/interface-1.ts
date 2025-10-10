interface UserAccount {
  // mandatory properties
  id: number;
  username: string;

  // readonly property (cannot be changed after creation)
  readonly createdAt: Date;

  // optional property
  email?: string;

  // method with no return value
  login(): void;

  // method with a return type
  logout(): boolean;
}


const if1u1: UserAccount = {
  id: 1,
  username: "alice123",
  createdAt: new Date(),

  login() {
    console.log(`${this.username} logged in.`);
  },

  logout() {
    console.log(`${this.username} logged out.`);
    return true;
  },
};

// ✅ Allowed: modifying normal property
if1u1.username = "aliceUpdated";

// ❌ Not allowed: modifying readonly property
// if1u1.createdAt = new Date(); // Error

// ✅ Optional property (can be added later)
if1u1.email = "alice@example.com";

// ✅ Using methods
if1u1.login();   // "aliceUpdated logged in."
if1u1.logout();  // "aliceUpdated logged out."
