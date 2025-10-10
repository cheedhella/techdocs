import axios from 'axios';

// Here, we used interface to define the structure of an Object;
interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const url = 'https://jsonplaceholder.typicode.com/todos/2';
axios.get(url).then(response => {
    const todo = response.data as Todo;
    
    // Response returned by API doesn't have any properties named 'ID', 'Title', 'finished';
    // Using the concept of interfaces, you can catch it during compile time itself;
    const id = todo.ID;                 // Property 'ID' does not exist on type 'Todo'. Did you mean 'id'?
    const title = todo.Title;           // Property 'Title' does not exist on type 'Todo'. Did you mean 'title'?
    const completed = todo.finished;    // Property 'finished' does not exist on type 'Todo'
    console.log(`id: ${id}, title: ${title}, completed: ${completed}`);
});