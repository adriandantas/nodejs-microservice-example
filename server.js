const app = require('./src/app');
const logger = require('./src/util/logger');
const db = require('./src/config/db');
const terminationHandler = require('./src/util/terminationHandler');

db.init();
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  logger.info(`listening on port ${port}`);
});

terminationHandler('SIGTERM', server);
terminationHandler('SIGINT', server);
