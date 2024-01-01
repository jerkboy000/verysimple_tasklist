require("dotenv").config();
const { expressMiddleware } = require("@apollo/server/express4");

// Express
const express = require("express");
const expressWinston = require("express-winston");

// Logging
const logger = require("./config/logger");

// JSON Web Token
const jwt = require("jsonwebtoken");

// Cookie parser
const cookieParser = require("cookie-parser");

// cors setup
const cors_setup = require("../src/config/cors_setup");

// Model associations
require("./model_association");

// HTTP Logging
const requestLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  colorize: true,
});

const app = express();
app.use(requestLogger);
app.use(cookieParser());

// Apollo setup
const server = require("../src/config/apollo_setup");

async function startServer() {
  await server.start();

  const PORT = process.env.PORT || 7000;

  app.listen(PORT, () => {
    logger.info(`Listening to port ${PORT}.`);
    logger.info(`🚀 Server ready at http://localhost:${PORT}/`);
  });
}

app.use("/", cors_setup, express.json(), (req, res, next) => {
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
