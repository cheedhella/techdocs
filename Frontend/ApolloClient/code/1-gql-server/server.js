const express = require("express"); 
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require('cors');

const port = 4000;

// Schema
const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// Resolvers
const root = {
    hello: () => {
        return "Hello World!";
    }
}

const app = express();
app.use(cors())

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}/graphql `);
});