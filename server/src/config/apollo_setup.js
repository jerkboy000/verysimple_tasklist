const { ApolloServer } = require("@apollo/server");

const typeDefs = require("../schema");
const resolvers = require("../resolvers");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: "http://localhost:5000",
    credentials: true,
  },
});

module.exports = apolloServer;
