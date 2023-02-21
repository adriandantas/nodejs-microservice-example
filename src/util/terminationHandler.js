const logger = require('./logger');

function terminationHandler(signal, server) {
  process.on(signal, () => {
    logger.info({
      message: `${signal} signal received: closing server`,
    });
    server.close(() => {
      logger.info({ message: 'Server closed' });
    });
  });
}

module.exports = terminationHandler;
