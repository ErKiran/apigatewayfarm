const winston = require("winston");

const myFormat = winston.format.printf(
  ({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  }
);

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), myFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logger/logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logger/logs/info.log",
      level: "info",
    }),
  ],
});

module.exports = logger;
