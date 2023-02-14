const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
});

if (process.env.ENV === 'test') {
  for (let idx = 0; idx < logger.transports.length; idx += 1)
    logger.transports[idx].silent = true;
}

module.exports = logger;
