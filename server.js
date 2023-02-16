const app = require('./src/app');
const logger = require('./src/util/logger');
const db = require('./src/config/db');

db.init();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`listening on port ${port}`);
});
