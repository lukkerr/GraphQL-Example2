const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema, resolvers } = require('./src/schemas/schema');
const { db } = require('./src/database/dbConnector');

var app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
  context: { db }
}));

app.listen(process.env.PORT || 4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');