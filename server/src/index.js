require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const express = require("express");
const expressWinston = require("express-winston");
const logger = require("./logger");

const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");

const cors = require("cors");

// Model associations
require("./model_association");

// Logging
const requestLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  colorize: true,
});

const app = express();
app.use(requestLogger);
app.use(cookieParser());

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: "http://localhost:5000",
    credentials: true,
  },
});

async function startServer() {
  await server.start();

  const PORT = process.env.PORT || 7000;

  app.listen(PORT, () => {
    logger.info(`Listening to port ${PORT}.`);
    logger.info(`🚀 Server ready at http://localhost:${PORT}/`);
  });
}

app.use("/", cors(), express.json(), (req, res, next) => {
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization.split(" ")[1] || "";
      try {
        const user = jwt.verify(token, process.env.AUTH_SECRET_KEY);
        return { user, res };
      } catch (error) {
        return { user: null, res };
      }
    },
  })(req, res, next);
});

startServer();
