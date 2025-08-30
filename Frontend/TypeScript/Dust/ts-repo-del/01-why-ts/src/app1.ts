// https://jsonplaceholder.typicode.com - It provides Fake JSON API;
// Let's make a call to one of the API using axios and print the result;

import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/2';
axios.get(url).then(response => { // axios.get(url) returns a promise;
    const todo = response.data;
    const id = todo.id;
    const title = todo.title;
    const completed = todo.completed;
    console.log(`id: ${id}, title: ${title}, completed: ${completed}`);
});
