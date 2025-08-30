var express = require('express');
const { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require('graphql');
const cors = require('cors');

// Schema
var schema = buildSchema(`
    type Query {
        todo(id: Int!): Todo
        todos: [Todo]
    },
    type Mutation {
        create(id: Int!, desc: String!): [Todo]
        update(id: Int!, desc: String!): [Todo]
        delete(id: Int!): [Todo]
    },
    type Todo {
        id: Int
        desc: String
    }
`);

var todosData = [];

var createTodo = function (args) {
    todosData.push(args);
    return todosData;
}

var getTodo = function ({id}) {
    return todosData.filter(todo => {
        return todo.id == id;
    })[0];
}

var getAllTodos = function () {
    return todosData;
}

var updateTodo = function({id, desc}) {
    todosData.map(todo => {
        if (todo.id === id) {
            todo.desc = desc;
        }
    });
    return todosData;
}

var deleteTodo = function({id}) {
    todosData.splice(todosData.findIndex(a => a.id === id) , 1);
    return todosData;
}

var root = {
    create: createTodo,
    todo: getTodo,
    todos: getAllTodos,
    update: updateTodo,
    delete: deleteTodo
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use(cors())

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));