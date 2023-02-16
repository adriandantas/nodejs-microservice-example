const app = require('./src/app');
const logger = require('./src/util/logger');
const db = require('./src/config/db');

db.init();
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  logger.info(`listening on port ${port}`);
});

process.on('SIGTERM', () => {
  logger.info({
    message: 'SIGTERM signal received: closing microservice server',
  });
  server.close(() => {
    logger.info({ message: 'Microservice server closed' });
  });
});

process.on('SIGINT', () => {
  logger.info({
    message: 'SIGINT signal received: closing microservice server',
  });
  server.close(() => {
    logger.info({ message: 'Microservice server closed' });
  });
});
