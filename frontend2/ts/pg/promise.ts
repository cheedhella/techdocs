Editor’s note: This article was last reviewed and updated by Ikeh Akinyemi in January 2025 to introduce advanced techniques for working with async/await, such as handling multiple async operations concurrently using Promise.all and managing async iterations with for await...of, as well as how to apply async/await within higher-order functions.

/*
What is Promise?
    Promise represents a value that might not be immediately available, but will be resolved at some point in the future;
    It can be in one of the following 3 states: Pending, Fulfilled, Rejected;

Applications of Promise?


const myPromise = new Promise((resolve, reject) => {
  // Do some asynchronous operation
  // If the operation is successful, call resolve with the result
  // If the operation fails, call reject with an error object
});

myPromise
  .then((result) => {
    // Handle the successful result
  })
  .catch((error) => {
    // Handle the error
  });
  
*/
