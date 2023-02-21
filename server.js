const app = require('./src/app');
const logger = require('./src/util/logger');
const db = require('./src/config/db');
const terminationHandler = require('./src/util/terminationHandler');

db.init();
let port = process.env.PORT;
if (!port) {
  port = 3000;
  logger.info({ message: 'PORT undefined. Using default value of 3000' });
}

const server = app.listen(port, () => {
  logger.info({ message: `Listening on port ${port}` });
});

terminationHandler('SIGTERM', server);
terminationHandler('SIGINT', server);
