const { ApolloServer } = require("@apollo/server");

const typeDefs = require("../schema");
const resolvers = require("../resolvers");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = apolloServer;
