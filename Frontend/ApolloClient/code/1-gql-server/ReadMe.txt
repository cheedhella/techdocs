# Setup GraphQL Server With Node.js And Express

> mkdir 1-gql-server 
> cd 1-gql-server
> npm init -y
> npm install express express-graphql graphql
        # express -> It is used to start GraphQL API server quickly;
        # express-graphql -> It is used to mount the GraphQL API server on given(/graphql) HTTP endpoint(UI); Alternatively, you can run a query directly using graphql function;
        # graphql -> This package contains logic to parse GraphQL queries;
> npm install cors        # Cors stands for cross-origin-resource-sharing; It will allow front-end to make calls to our backend;

> touch server.js
> node server.js            # This starts the GraphQL API Server at: http://localhost:4000/graphql 
-----------------------------------------------------------------------------------------------------------------------------------------------------------------
# Use nodemon package, if you want to restart automatically, in case of any changes to node application;
> npm install nodemon
> edit package.json     # "server": "nodemon ./server/server.js"
> npm run server        # This starts the GraphQL API Server at: http://localhost:4000/graphql 

Navigate to http://localhost:4000/graphql, try this query: {hello}
-----------------------------------------------------------------------------------------------------------------------------------------------------------------
> vi course-server.js
> node course-server.js

-----------------------------------------------------------------------------------------------------------------------------------------------------------------

> vi mc-todo-server.js 


// create
mutation createTodo($id: Int!, $desc: String!) {
  create(id: $id, desc: $desc) {
    ...todoFields
  }
}

fragment todoFields on Todo {
  id, 
  desc
}

{
  "id": 1,
  "desc": "todo-1"
}



// read 
query mySelectedTodos($id1: Int!, $id2:Int!) {
  t1: todo(id: $id1) {
    ...todoFields
  },
  t2: todo(id: $id2) {
    ...todoFields
  }
}
{
  "id1": 1,
  "id2": 2
}




// update
mutation myUpdateTodo($id: Int!, $desc: String!) {
  update(id: $id, desc: $desc) {
    ...todoFields
  }
}

fragment todoFields on Todo {
  id, 
  desc
}

{
  "id": 1,
  "desc": "new-todo-1"
}


// delete 
mutation myDeleteTodo($id: Int!) {
  delete(id: $id) {
    ...todoFields
  }
}

fragment todoFields on Todo {
  id, 
  desc
}

{
  "id": 1
}






Reference:
https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1
https://codesandbox.io/s/o1chp?file=/src/schema.graphql