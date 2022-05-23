const { makeExecutableSchema } = require('@graphql-tools/schema');
const { merge } = require('lodash');
const { typeUser } = require('./user');
const { resolversUser } = require('./user');

const Query = `
  type Query {
    _empty: String
  }
`;

const Mutation = `
  type Mutation {
    _empty: String
  }
`;



const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, typeUser],
  resolvers: {}
});

const resolvers = merge(resolversUser);

module.exports = { schema, resolvers };