const winston = require("winston");
const path = require("path");
const fs = require("fs");
const { format } = winston;
const { combine, timestamp, printf } = format;

const logDir = "logs";

// T?o thý m?c logs n?u chýa t?n t?i
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(
        logDir,
        `log_${new Date().toISOString().split("T")[0].replace(/-/g, "")}.log`
      ),
      level: "error",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
