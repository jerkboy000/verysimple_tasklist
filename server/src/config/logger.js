const { createLogger, format, transports } = require("winston");
const path = require("path");

const logDirectory = path.join(__dirname, "../logs");

const logFormat = format.combine(format.timestamp(), format.simple());

const logger = createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new transports.Console({
      format: format.simple(),
    }),
    new transports.File({
      filename: path.join(logDirectory, "error.log"),
      level: "error",
    }),
    new transports.File({
      filename: path.join(logDirectory, "combined.log"),
    }),
  ],
});

module.exports = logger;
