import axios from 'axios';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const url = 'https://jsonplaceholder.typicode.com/todos/2';
axios.get(url).then(response => {
    const todo = response.data as Todo;
    const id = todo.id; 
    const title = todo.title;
    const completed = todo.completed;
    
    // If you use plain JavaScript, you can't idenitify issues till runtime;
    logTodo(id, completed, title); // id: 2, title: false, completed: quis ut nam facilis et officia qui
    
    // If you use TypeScript, you can catch the errors during development OR compile time itself;
    // logTodoTS(id, completed, title); // ERROR: Argument of type 'boolean' is not assignable to parameter of type 'string'
    logTodoTS(id, title, completed); 
});

const logTodo = (id, title, completed) => {
    console.log(`id: ${id}, title: ${title}, completed: ${completed}`);
}

const logTodoTS = (id: number, title: string, completed: boolean) => {
    console.log(`id: ${id}, title: ${title}, completed: ${completed}`);
}